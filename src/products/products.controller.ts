import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Product } from './entity/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: Product })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Buscar produto por SKU' })
  @ApiParam({ name: 'sku', type: 'string' })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(sku);
  }

  @Put(':sku')
  @ApiOperation({ summary: 'Atualizar produto por SKU' })
  @ApiParam({ name: 'sku', type: 'string' })
  @ApiResponse({ status: 200, type: Product })
  update(@Param('sku') sku: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(sku, dto);
  }

  @Delete(':sku')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar produto por SKU' })
  @ApiParam({ name: 'sku', type: 'string' })
  @ApiResponse({ status: 204 })
  remove(@Param('sku') sku: string) {
    return this.productsService.remove(sku);
  }
}
