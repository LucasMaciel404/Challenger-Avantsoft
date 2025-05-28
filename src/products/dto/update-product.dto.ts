import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Camiseta Azul' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 59.9 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
