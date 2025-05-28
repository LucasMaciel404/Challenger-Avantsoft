import { IsOptional, IsString, IsNumber, Min, IsUUID } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  sku?: string;

  @ApiProperty({ example: 'Camiseta Preta' })
  @IsString()
  name: string;

  @ApiProperty({ example: 49.9 })
  @IsNumber()
  @Min(0)
  price: number;
}
