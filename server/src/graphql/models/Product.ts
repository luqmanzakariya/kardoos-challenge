import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  slug: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  image: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  @Field()
  updatedAt?: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}
