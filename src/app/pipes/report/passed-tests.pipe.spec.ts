import { PassedTestsPipe } from './passed-tests.pipe';

describe('PassedTestsPipe', () => {
  it('create an instance', () => {
    const pipe = new PassedTestsPipe();
    expect(pipe).toBeTruthy();
  });
});
