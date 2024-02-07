import { UtcOffsetPipe } from './utcOffset.pipe';

describe('TimezonePipe', () => {
  let pipe: UtcOffsetPipe;
  beforeEach(() => {
    pipe = new UtcOffsetPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform offset to "UTC ±hh:mm"', () => {
    const offset = 3600;
    const expectedResult = 'UTC +01:00';
    expect(pipe.transform(offset)).toEqual(expectedResult);
  });

  it('should handle negative offset correctly', () => {
    const offset = -10800;
    const expectedResult = 'UTC -03:00';
    expect(pipe.transform(offset)).toEqual(expectedResult);
  });
});
