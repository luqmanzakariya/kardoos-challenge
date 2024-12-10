import styles from "./page.module.css";
import { getProducts } from "@/lib/fetch-data";
import TemplateClient from "@/components/templateClient";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className={styles.page}>
      <TemplateClient products={products} />
      <footer className={styles.footer}></footer>
    </div>
  );
}
