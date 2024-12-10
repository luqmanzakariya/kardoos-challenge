export interface DataStructure {
  data: Data;
}

export interface Data {
  getProducts: Product[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
