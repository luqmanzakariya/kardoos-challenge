import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  description: string;

  @Field()
  image: string;
}
