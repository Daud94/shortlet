import { IsBoolean, IsOptional } from 'class-validator';

export class FulltextDto {
  @IsOptional()
  @IsBoolean()
  fulltext: boolean = false;
}
