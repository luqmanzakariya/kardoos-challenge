import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;
}
