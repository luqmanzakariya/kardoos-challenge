// import Image from "next/image";
import { Image } from "@chakra-ui/react";
import styles from "./page.module.css";
import { Card, For, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/fetch-data";
import { Text } from "@chakra-ui/react";
import Form from "@/components/form/form";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Text textAlign="center" fontWeight={900} fontSize={32}>
          Create New
        </Text>
        <Form />
        <Text textAlign="center" fontWeight={900} fontSize={32}>
          Product List
        </Text>
        <Stack gap="4" direction="row" justifyContent="center" wrap="wrap">
          <For each={products}>
            {(data) => (
              <Card.Root
                padding="4"
                width="320px"
                variant={"elevated"}
                key={data.id}
              >
                <Card.Body gap="2" mb="4" alignItems="center">
                  <Image src={data?.image} alt="img" />
                  <Card.Title mb="2">{data?.name}</Card.Title>
                  <Card.Description>{data?.description}</Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="center">
                  <Button padding="4" variant="outline">
                    Detail
                  </Button>
                  <Button padding="4">Edit</Button>
                </Card.Footer>
              </Card.Root>
            )}
          </For>
        </Stack>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
