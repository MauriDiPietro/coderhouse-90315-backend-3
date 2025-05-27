import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductService {
    products: Product[];
    constructor();
    create(product: CreateProductDto): Product;
    findAll(): Product[];
    findOne(id: string): Product | undefined;
}
