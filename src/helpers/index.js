const recursivelyGet = (target, keys) => (
  keys.reduce((acc, k) => acc[k], target)
);

const recursivelyRetrace = (acc, level) => {
  const keys = acc.targetKeys;
  const current = recursivelyGet(acc, keys);
  if (current.level && current.level === level) return acc;
  acc.targetKeys = acc.targetKeys.slice(0, -1);
  return recursivelyRetrace(acc, level);
};

const recursivelyGenerateChild = (acc, level) => {
  const targetKeys = acc.targetKeys;
  const currentTarget = recursivelyGet(acc, targetKeys);
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
    const currentTarget = recursivelyGet(acc, acc.targetKeys);
    if (contentType !== 'header') {
      /* if (!currentTarget.body) currentTarget.body = []; */
      currentTarget.body.push(content);
      return acc;
    } else if (currentTarget.level < content[1].level) {
      const appended = recursivelyGenerateChild(acc, content[1].level);
      const contentTarget = recursivelyGet(appended, appended.targetKeys);
      contentTarget.body.push(content);
      return appended;
    } else if (currentTarget.level === content[1].level) {
      const popped = acc.targetKeys.pop();
      const targetChildren = recursivelyGet(acc, acc.targetKeys);
      targetChildren.push({
        level: content[1].level,
        body: [],
      });
      acc.targetKeys.push(popped + 1);
      const contentTarget = recursivelyGet(acc, acc.targetKeys);
      contentTarget.body.push(content);
      return acc;
    }

    const retraced = recursivelyRetrace(acc, content[1].level);
    const popped = retraced.targetKeys.pop();
    const targetChildren = recursivelyGet(retraced, retraced.targetKeys);
    targetChildren.push({
      level: content[1].level,
      body: [],
    });
    retraced.targetKeys.push(popped + 1);
    const contentTarget = recursivelyGet(retraced, retraced.targetKeys);
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

const nestByHeadingLevel = (tree) => {
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
  static nestByHeadingLevel = nestByHeadingLevel;
}
