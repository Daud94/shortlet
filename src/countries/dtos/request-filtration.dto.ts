import { IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { ServiceEnums } from '../enums/service.enums';
import { Transform } from 'class-transformer';

export class RequestFiltrationDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(ServiceEnums, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    } else {
      return value;
    }
  })
  fields: string[];
}
