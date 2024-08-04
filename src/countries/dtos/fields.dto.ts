import { ServiceEnums } from '../enums/service.enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class FieldsDto {
  @IsNotEmpty({ message: 'Service type is required' })
  @IsEnum(ServiceEnums, { message: 'Invalid field type' })
  field: string;
}
