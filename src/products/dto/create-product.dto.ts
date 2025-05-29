import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'SKU12345' })
  @IsString()
  @IsNotEmpty({ message: 'O SKU não pode ser vazio' })
  sku: string;

  @ApiProperty({ example: 'Camiseta Branca' })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @ApiProperty({ example: 59.9 })
  @IsNumber()
  @Min(0.01, { message: 'O preço deve ser maior que 0' })
  price: number;
}
