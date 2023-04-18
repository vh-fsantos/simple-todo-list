import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description: string;

  @IsOptional()
  @IsISO8601()
  dueDate: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
