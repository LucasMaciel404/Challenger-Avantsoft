// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 'd5e94bb2-2c3a-4ff1-9e92-81e7cb57c82c' })
  @PrimaryGeneratedColumn('uuid')
  sku: string;

  @ApiProperty({ example: 'Camiseta Azul' })
  @Column()
  name: string;

  @ApiProperty({ example: 49.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
