import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { Product } from '../graphql/models/Product';
import { CreateProductInput } from '../graphql/utils/CreateProductInput';
import { UpdateProductInput } from 'src/graphql/utils/UpdateProductInput';
import { ProductService } from './Products.service';

import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Product)
export class ProductResolver {
  private pubSub: PubSub;
  constructor(private productService: ProductService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Product], { nullable: true })
  async getProducts() {
    return this.productService.getAllProducts();

    // Including deleted records
    // return this.productService.getAllProducts({ withDeleted: true });
  }

  @Query(() => Product, { nullable: true })
  getProductById(@Args('id', { type: () => Int }) id: number) {
    return this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductData') createProductData: CreateProductInput,
  ) {
    const product: Product =
      await this.productService.createProduct(createProductData);
    this.pubSub.publish('productUpdated', { productUpdated: product });
    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductData') updateProductData: UpdateProductInput,
  ) {
    await this.productService.updateProduct(id, updateProductData);
    const res = await this.productService.getProductById(id);
    this.pubSub.publish('productUpdated', {
      productUpdated: res,
    });
    return res;
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Args('id', { type: () => Int }) id: number) {
    const res = await this.productService.getProductById(id);
    if (res) {
      await this.productService.softDeleteProduct(res);
    }

    this.pubSub.publish('productUpdated', { productUpdated: res });
    return res;
  }

  // Restore from soft delete
  // @Mutation(() => Product, { nullable: true })
  // async restoreProduct(@Args('id', { type: () => Int }) id: number) {
  //   await this.productService.restoreProduct(id);
  //   const res = await this.productService.getProductById(id);
  //   if (res) {
  //     await this.productService.restoreProduct(id);
  //   }

  //   this.pubSub.publish('productUpdated', { productUpdated: res });
  //   return res;
  // }

  @Subscription(() => Product, {
    name: 'productUpdated',
  })
  subscribeToProductUpdated() {
    return this.pubSub.asyncIterableIterator('productUpdated');
  }
}
