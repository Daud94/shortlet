import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { ServiceEnums } from '../enums/service.enums';

export class RequestFiltrationDto {
  @IsNotEmpty({ message: 'service is required' })
  @IsString({ each: true })
  @IsEnum(ServiceEnums, { each: true })
  fields: string | string[];
}
