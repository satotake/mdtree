import Helpers from './index';

describe('nestByHeadingLevel', () => {
  it('test', () => {
    const result = Helpers.nestByHeadingLevel(true);
    expect(result)
      .toBe(true);
  });
});
