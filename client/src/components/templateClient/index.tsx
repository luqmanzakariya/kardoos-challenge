"use client";
import { useState } from "react";
import { Image } from "@chakra-ui/react";
import styles from "../../app/page.module.css";
import { Card, For, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Text } from "@chakra-ui/react";
import Form from "@/components/form/form";
import { Product } from "@/types";

interface TemplateClientProps {
  products: Product[];
}

const TemplateClient = ({ products }: TemplateClientProps) => {
  const [step, setStep] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const handleStepCreate = (str: string) => {
    if (step === str) {
      setStep("");
    } else {
      setStep(str);
    }
  };

  const handleStepEdit = (str: string, val: Product) => {
    setStep(str)
    setSelected(val)
    if (selected?.name === val?.name){
      setStep("");
    }
  };

  return (
    <main className={styles.main}>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <Button
          padding="4"
          variant="solid"
          onClick={() => handleStepCreate("create")}
        >
          Create
        </Button>
      </nav>
      {step === "create" && (
        <>
          <Text textAlign="center" fontWeight={900} fontSize={32}>
            Create New
          </Text>
          <Form type="create"/>
        </>
      )}
      {step === "edit" && (
        <>
          <Text textAlign="center" fontWeight={900} fontSize={32}>
            Edit {selected?.name}
          </Text>
          <Form initialData={selected || undefined} type="edit" />
        </>
      )}
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
                <Button padding="4" onClick={() => handleStepEdit("edit", data)}>
                  Edit
                </Button>
              </Card.Footer>
            </Card.Root>
          )}
        </For>
      </Stack>
    </main>
  );
};

export default TemplateClient;
