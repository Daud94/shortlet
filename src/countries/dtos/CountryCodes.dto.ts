import { IsArray, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class CountryCodesDto {
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    } else {
      return value;
    }
  })
  codes: string[];
}
