import { Module } from '@nestjs/common';
import { ProductResolver } from './ProductResolver';
import { ProductService } from './Products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/graphql/models/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService],
})
export class ProductsModule {}
