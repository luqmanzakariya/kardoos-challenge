import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/graphql/models/Product';
import { CreateProductInput } from 'src/graphql/utils/CreateProductInput';
import { UpdateProductInput } from 'src/graphql/utils/UpdateProductInput';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  getAllProducts() {
    return this.productsRepository.find();
  }

  getProductById(id: number) {
    return this.productsRepository.findOneBy({ id });
  }

  createProduct(createProductData: CreateProductInput) {
    const newProduct = this.productsRepository.create(createProductData);

    return this.productsRepository.save(newProduct);
  }

  updateProduct(id: number, updateProductInput: UpdateProductInput) {
    return this.productsRepository.update(id, updateProductInput);
  }

  deleteProduct(id: number) {
    return this.productsRepository.delete(id);
  }

  softDeleteProduct(product: Product) {
    return this.productsRepository.softRemove(product);
  }

  restoreProduct(id: number) {
    return this.productsRepository.restore(id);
  }
}
