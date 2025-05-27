import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  products: Product[];
  constructor() {
    this.products = [];
  }

  create(product: CreateProductDto): Product {
    const body = { ...product, id: `${Math.random() * 1000}` };
    this.products.push(body);
    return body;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
