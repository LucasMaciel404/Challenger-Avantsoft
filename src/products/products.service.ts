import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
   
  async create(data: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(sku: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ sku });

    if (!product) {
      throw new NotFoundException(`Produto com SKU ${sku} não encontrado.`);
    }

    return product;
  }

  async update(sku: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(sku);
    const updated = Object.assign(product, data);
    return this.productRepository.save(updated);
  }

  async remove(sku: string): Promise<void> {
    const result = await this.productRepository.delete(sku);

    if (result.affected === 0) {
      throw new NotFoundException(`Produto com SKU ${sku} não encontrado.`);
    }
  }
}
