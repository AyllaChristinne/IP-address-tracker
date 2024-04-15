import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcOffset',
  standalone: true,
  pure: true,
})
export class UtcOffsetPipe implements PipeTransform {
  transform(offset: number): string {
    if (!offset && offset !== 0) {
      return '';
    }

    const sign = offset < 0 ? '-' : '+';
    const hours = Math.floor(Math.abs(offset) / 100);
    const minutes = Math.abs(offset) % 100;

    const formattedOffset = `${sign}${this.padNumber(hours)}:${this.padNumber(
      minutes
    )}`;
    return `UTC ${formattedOffset}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
