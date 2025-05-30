import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({ order: { name: 'ASC' } });

    const response = products.map((product) => ({ ...product,
      name: this.removeFirstAlphabetLetter(product.name) }));

    return response;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.validateProductExists(id);
    const response = { ...product,
      name: this.removeFirstAlphabetLetter(product.name) };

    return response;
  }

  async create(data: CreateProductDto): Promise<Product> {

    await this.validateSku(data.sku);

    const product = await this.productRepository.create(data);

    return this.productRepository.save(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {

    const product = await this.findOne(id);

    const updated = Object.assign(product, data);

    return this.productRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    this.validateProductExists(id);

    const result = await this.productRepository.delete(id);
  }

  private async validateSku(sku: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ sku });

    if (product) {
      throw new BadRequestException(`Já existe um produto com o SKU '${sku}'`);
    }
  }

  private async validateProductExists(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return product;
  }

  removeFirstAlphabetLetter(name: string): string {

    const letters = name.match(/[a-zA-Z]/g);

    if (!letters || letters.length === 0) return name;

    const lettersLowerCase = letters.map((letter) => letter.toLowerCase());

    const firstAlphabetLetter = lettersLowerCase.reduce(
      (result, item) => (item < result ? item : result),
      lettersLowerCase[0],
    );

    const isAllLetterEqual = lettersLowerCase.every(
      (letter) => letter === firstAlphabetLetter,
    );

    if (isAllLetterEqual) {
      return name.replace(new RegExp(firstAlphabetLetter, 'gi'), '_');
    }

    return name.replace(new RegExp(firstAlphabetLetter, 'i'), '');
  }
}
