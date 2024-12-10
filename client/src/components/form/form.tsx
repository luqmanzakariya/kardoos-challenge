"use client";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const Form = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createProduct, { data, loading, error }] = useMutation(gql`
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
  `);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await createProduct({
        variables: {
          createProductData: {
            slug,
            name,
            price: Number(price),
            description,
            image,
          },
        },
      });
      console.log("Product created:", result);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" direction="row" justifyContent="center" wrap="wrap">
        <Input
          placeholder="name"
          padding="2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="slug"
          padding="2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Input
          placeholder="price"
          padding="2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="description"
          padding="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="image-link"
          padding="2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button
          mt="4"
          padding="4"
          textAlign="center"
          className="login-button"
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
