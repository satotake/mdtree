const recursivelyAccess = (target, keys) => (
  keys.reduce((acc, k) => acc[k], target)
);

const recursivelyRetrace = (acc, level) => {
  const keys = acc.targetKeys;
  const current = recursivelyAccess(acc, keys);
  if (current.level && current.level === level) return acc;
  acc.targetKeys = acc.targetKeys.slice(0, -1);
  return recursivelyRetrace(acc, level);
};

const recursivelyGenerateChild = (acc, level) => {
  const targetKeys = acc.targetKeys;
  const currentTarget = recursivelyAccess(acc, targetKeys);
  if (currentTarget.level === level) return acc;

  const nextLevel = currentTarget.level + 1;
  acc.targetKeys.push('ch');
  acc.targetKeys.push(0);
  currentTarget.ch = [{
    level: nextLevel,
    body: [],
  }];
  return recursivelyGenerateChild(acc, level);
};

function getRootBase(contents = []) {
  return contents.reduce((acc, content) => {
    const contentType = content[0];
    const currentTarget = recursivelyAccess(acc, acc.targetKeys);
    if (contentType !== 'header') {
      currentTarget.body.push(content);
      return acc;
    } else if (currentTarget.level < content[1].level) {
      const appended = recursivelyGenerateChild(acc, content[1].level);
      const contentTarget = recursivelyAccess(appended, appended.targetKeys);
      contentTarget.body.push(content);
      return appended;
    } else if (currentTarget.level === content[1].level) {
      const popped = acc.targetKeys.pop();
      const targetChildren = recursivelyAccess(acc, acc.targetKeys);
      targetChildren.push({
        level: content[1].level,
        body: [],
      });
      acc.targetKeys.push(popped + 1);
      const contentTarget = recursivelyAccess(acc, acc.targetKeys);
      contentTarget.body.push(content);
      return acc;
    }

    /* currentTarget.level > content[1].level */
    const retraced = recursivelyRetrace(acc, content[1].level);
    const popped = retraced.targetKeys.pop();
    const targetChildren = recursivelyAccess(retraced, retraced.targetKeys);
    targetChildren.push({
      level: content[1].level,
      body: [],
    });
    retraced.targetKeys.push(popped + 1);
    const contentTarget = recursivelyAccess(retraced, retraced.targetKeys);
    contentTarget.body.push(content);
    return retraced;
  }, {
    root: {
      level: 0,
      body: [],
      ch: [],
    },
    targetKeys: ['root'],
  });
}

const nestByHeaderLevel = (tree) => {
  const [doctype, ...contents] = tree;

  const {
    root,
  } = getRootBase(contents);

  return {
    meta: {
      doctype,
    },
    root,
  };
};

export default class Helpers {
  static nestByHeaderLevel = nestByHeaderLevel;
}
