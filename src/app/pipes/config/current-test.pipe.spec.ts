import { CurrentTestPipe } from './current-test.pipe';

describe('CurrentTestPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrentTestPipe();
    expect(pipe).toBeTruthy();
  });
});
