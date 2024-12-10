import { gql } from "@apollo/client";
import { getClient } from "./apollo-client";
import { Product, type DataStructure } from "@/types";

export async function getProducts() {
  const { data }: DataStructure = await getClient().query({
    query: gql`
      query {
        getProducts {
          id
          slug
          name
          description
          price
          image
          createdAt
          updatedAt
          deletedAt
        }
      }
    `,
  });

  return data.getProducts;
}

export const createProducts = async (payload: Product) => {
  const client = getClient();
  const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($createProductData: CreateProductInput!) {
      createProduct(createProductData: $createProductData) {
        id
        slug
        name
        description
        image
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_PRODUCT_MUTATION,
    variables: {
      createProductData: {
        slug: payload.slug,
        name: payload.name,
        price: Number(payload.price),
        description: payload.description,
        image: payload.image,
      },
    },
  });

  console.log('data', data)

  return data
};
