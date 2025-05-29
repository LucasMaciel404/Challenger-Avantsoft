import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'SKU12345' })
  @Column({ unique: true })
  sku: string;

  @ApiProperty({ example: 'Camiseta Branca' })
  @Column()
  name: string;

  @ApiProperty({ example: 59.9 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
