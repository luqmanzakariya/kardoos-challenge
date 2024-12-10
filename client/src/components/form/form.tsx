"use client";
import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Product } from "@/types";

interface FormProps {
  initialData?: Product;
  type: string;
}

const Form = ({ initialData, type }: FormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [image, setImage] = useState(initialData?.image || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData?.name);
      setSlug(initialData?.slug);
      setDescription(initialData?.description);
      setPrice(initialData?.price);
      setImage(initialData.image);
    }
  }, [initialData]);

  const [
    createProduct,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(gql`
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

  const [
    updateProduct,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(gql`
    mutation UpdateProduct($id: Int!, $updateProductData: UpdateProductInput!) {
      updateProduct(id: $id, updateProductData: $updateProductData) {
        id
        slug
        name
        price
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

    if (type === "create") {
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
    } else {
      try {
        const result = await updateProduct({
          variables: {
            id: initialData?.id,
            updateProductData: {
              slug,
              name,
              price: Number(price),
              description,
              image,
            },
          },
        });
        console.log("Product updated:", result);
      } catch (err) {
        console.error("Error creating product:", err);
      }
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
