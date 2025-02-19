import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imgUrl: string;
}
