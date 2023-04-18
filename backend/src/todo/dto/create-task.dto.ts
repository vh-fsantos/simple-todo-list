import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description: string;

  @IsOptional()
  @IsISO8601()
  dueDate: string;
}
