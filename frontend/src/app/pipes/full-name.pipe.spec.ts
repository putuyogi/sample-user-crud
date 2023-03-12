import { FullNamePipe } from './full-name.pipe';

describe('FullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullNamePipe();
    expect(pipe).toBeTruthy();
  });
  it('use valid string param and verify the response is valid', () => {
    const pipe = new FullNamePipe();
    expect(pipe.transform('Putu', 'Yogi')).toBe('Putu Yogi')
  });
  it('use multiple valid string param and verify the response is valid', () => {
    const pipe = new FullNamePipe();
    expect(pipe.transform('Putu', 'Yogi', 'Pratama')).toBe('Putu Yogi Pratama')
  });
  it('use null param and verify the response is valid', () => {
    const pipe = new FullNamePipe();
    expect(pipe.transform('Putu', 'null')).toBe('Putu')
  });
  it('use empty param and verify the response is valid', () => {
    const pipe = new FullNamePipe();
    expect(pipe.transform('Putu', '')).toBe('Putu')
  });
});
