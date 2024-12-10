# Kardoos Challenge
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The Project is used to display the user interactive to Bappenas Quiz Service.

## Task Detail
Buatkan web aplikasi yang menampilkan product list, product detail dan form untuk membuat, merubah dan menghapus product dengan spesifikasi berikut:
1. Field
    - Slug
    - Name
    - Price
    - Description
    - Image
    - Created At
    - Updated At
    - Deleted At
2. Teknologi
    - Frontend
      - NextJs
      - Typescript
      - Chakra UI
      - ReactQuery
      - GraphQL
      - Axios
    - Backend
      - NestJs
      - TypeORM
      - Mysql / Postgree
      - GraphQL
      - Unit Test (Nilai Tambah)
3. Feature
    - Product list degan GQL Subscription
    - Product detail dengan GQL Query
    - Product create/update dengan rest api multipart form data
    - Design berbeda antara Desktop dengan Mobile version

## Run Backend application
### 1. Prepare database via docker (optional):
Make sure you have installed docker then go to folder "./server/.docker
```console
docker compose up -d
```
### 2. Install dependencies:
Go to folder "./server
```console
npm install
```
```console
npm start:dev
```
The API will start on port 3000 and can be accessed at http://localhost:3000

## Run Frontend Application
### 1. Install dependencies:
The minimum node version required is Node.20.x
```console
npm install
```
### 2. Run the application:
```console
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.