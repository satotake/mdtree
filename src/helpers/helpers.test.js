import {
  markdown,
} from 'markdown';

import Helpers from './index';

describe('nestByHeadingLevel', () => {
  const callFUT = Helpers.nestByHeadingLevel;

  it('empty', () => {
    const raw = '';
    const tree = markdown.parse(raw);
    // ['markdown']
    const actual = callFUT(tree);
    const expected = {
      meta: {
        doctype: 'markdown',
      },
    };
    expect(actual)
      .toMatchObject(expected);
  });
  it('no heading', () => {
    const raw = `
no

heading
`;
    const tree = markdown.parse(raw);
    // [ 'markdown', [ 'para', 'no' ], [ 'para', 'heading' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        body: [
          ['para', 'no'],
          ['para', 'heading'],
        ],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1 only', () => {
    const raw = '# H1';
    const tree = markdown.parse(raw);
    // [ 'markdown', [ 'header', { level: 1 }, 'H1' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'H1'],
          ],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('para, H1', () => {
    const raw = `
paragraph
# H1
`;
    const tree = markdown.parse(raw);
    /* [ 'markdown',
     *   [ 'para', 'paragraph' ],
     *   [ 'header', { level: 1 }, 'H1' ] ] */
    const actual = callFUT(tree);

    const expected = {
      root: {
        level: 0,
        body: [
          ['para', 'paragraph'],
        ],
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'H1'],
          ],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });

  it('H1 only without text', () => {
    const raw = '# ';
    const tree = markdown.parse(raw);
    // [ 'markdown', [ 'header', { level: 1 } ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }],
          ],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H3 only', () => {
    const raw = '### h3';
    const tree = markdown.parse(raw);
    // [ 'markdown', [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);

    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          ch: [{
            level: 2,
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
              ],
            }],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1, H2, H3', () => {
    const raw = `
# h1
## h2
### h3
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2'],
            ],
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
              ],
            }],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1, H2, H2 , H3', () => {
    const raw = `
# h1
## h2-1
## h2-2
### h3
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2-1' ],
    //   [ 'header', { level: 2 }, 'h2-2' ],
    //   [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2-1'],
            ],
          }, {
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2-2'],
            ],
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
              ],
            }],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1, H2, H3, H1, H2', () => {
    const raw = `
# h1
## h2
### h3

# h1-2
## h2-2
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'header', { level: 1 }, 'h1-2' ],
    //   [ 'header', { level: 2 }, 'h2-2' ] ]

    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2'],
            ],
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
              ],
            }],
          }],
        }, {
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1-2'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2-2'],
            ],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1, H2, H3, H2', () => {
    const raw = `
# h1
## h2
### h3
## h2-2
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'header', { level: 2 }, 'h2-2' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2'],
            ],
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
              ],
            }],
          }, {
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2-2'],
            ],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1, H2, H4', () => {
    const raw = `
# h1
## h2
#### h4
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 4 }, 'h4' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2'],
            ],
            ch: [{
              level: 3,
              ch: [{
                level: 4,
                body: [
                  ['header', {
                    level: 4,
                  }, 'h4'],
                ],
              }],
            }],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });
  it('H1 para, H2 para, H3 para', () => {
    const raw =
      `
# h1

paragraph1

## h2

paragraph2

### h3
paragraph3
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'para', 'paragraph1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'para', 'paragraph2' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'para', 'paragraph3' ] ]
    const actual = callFUT(tree);
    const expected = {
      root: {
        level: 0,
        ch: [{
          level: 1,
          body: [
            ['header', {
              level: 1,
            }, 'h1'],
            ['para', 'paragraph1'],
          ],
          ch: [{
            level: 2,
            body: [
              ['header', {
                level: 2,
              }, 'h2'],
              ['para', 'paragraph2'],
            ],
            ch: [{
              level: 3,
              body: [
                ['header', {
                  level: 3,
                }, 'h3'],
                ['para', 'paragraph3'],
              ],
            }],
          }],
        }],
      },
    };
    expect(actual.root)
      .toMatchObject(expected.root);
  });

  /* TODO(markdown-js cannot distinguish header from #header) */
  xit('header, subheader, H1 para, H2 para, H3 para', () => {
    const raw = `
header
===
subheader
---

# h1
`;
    const tree = markdown.parse(raw);
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'header' ],
    //   [ 'header', { level: 2 }, 'subheader' ],
    //   [ 'header', { level: 1 }, 'h1' ],
    const actual = callFUT(tree);
    const expected = false;
    expect(actual.root)
      .toMatchObject(expected.root);
  });
});

