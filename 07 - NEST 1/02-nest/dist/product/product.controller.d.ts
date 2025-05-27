import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(product: CreateProductDto): CreateProductDto;
    findAll(): import("./entities/product.entity").Product[];
    findOne(id: string): import("./entities/product.entity").Product;
}
