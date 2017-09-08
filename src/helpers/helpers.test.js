import fs from 'fs';
import {
  markdown,
} from 'markdown';

import Helpers from './index';

const testMDDir = '/test_mds/';

const readAndParseMD = (filename) => {
  const raw = fs.readFileSync(`${__dirname}${testMDDir}${filename}`, 'utf8');
  return markdown.parse(raw);
};

describe('nestByHeadingLevel', () => {
  const callFUT = Helpers.nestByHeadingLevel;
  it('empty', () => {
    const tree = readAndParseMD('empty.md');
    // [ 'markdown', [ 'para', 'no heading' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('no heading', () => {
    const tree = readAndParseMD('no_h.md');
    // [ 'markdown', [ 'para', 'no heading' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1 only', () => {
    const tree = readAndParseMD('h1.md');
    // [ 'markdown', [ 'header', { level: 1 }, 'H1' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1 only without text', () => {
    const tree = readAndParseMD('h1_without_text.md');
    // [ 'markdown', [ 'header', { level: 1 } ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H3 only', () => {
    const tree = readAndParseMD('h3.md');
    // [ 'markdown', [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1, H2, H3', () => {
    const tree = readAndParseMD('h1_to_h3.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1, H2, H2 , H3', () => {
    const tree = readAndParseMD('h1_to_h2_then_h2_to_h3.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1, H2, H3, H1, H2', () => {
    const tree = readAndParseMD('h1_to_h3_then_h1_to_h2.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ] ]

    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1, H2, H3, H2', () => {
    const tree = readAndParseMD('h1_to_h3_then_h2.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'header', { level: 2 }, 'h2' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1, H2, H4', () => {
    const tree = readAndParseMD('h1_to_h2_then_h4.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 4 }, 'h4' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1 para, H2 para, H3 para', () => {
    const tree = readAndParseMD('h1_to_h3_with_paras.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'para', 'paragraph' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'para', 'paragraph' ],
    //   [ 'header', { level: 3 }, 'h3' ],
    //   [ 'para', 'paragraph' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
  it('H1 para, H2 para, H3 para', () => {
    const tree = readAndParseMD('h1_to_h3_with_header.md');
    // [ 'markdown',
    //   [ 'header', { level: 1 }, 'header' ],
    //   [ 'header', { level: 2 }, 'subheader' ],
    //   [ 'header', { level: 1 }, 'h1' ],
    //   [ 'header', { level: 2 }, 'h2' ],
    //   [ 'header', { level: 3 }, 'h3' ] ]
    const actual = callFUT(tree);
    expect(actual)
      .toBe(true);
  });
});
