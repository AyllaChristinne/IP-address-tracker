import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcOffset',
  standalone: true,
  pure: true,
})
export class UtcOffsetPipe implements PipeTransform {
  transform(offset: number): string {
    if (offset == null) {
      return '';
    }

    const offsetInMinutes = offset / 60;
    const sign = offsetInMinutes >= 0 ? '+' : '-';

    const hours = Math.abs(Math.floor(offsetInMinutes / 60));
    const minutes = Math.abs(offsetInMinutes % 60);

    const formattedOffset = `${sign}${this.padNumber(hours)}:${this.padNumber(
      minutes
    )}`;
    return `UTC ${formattedOffset}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
