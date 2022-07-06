# MATA62 - SOFTWARE ENGINEERING I 
## GraphQL Server with NestJS and PrismaORM

We choose the following stack:

- [**NodeJS**](https://nodejs.org/en/): A JavaScript runtime built on Chrome's V8 JavaScript engine
- [**NestJS**](https://docs.nestjs.com/graphql/quick-start): Web framework for building scalable server-side applications
- [**GraphQL**](https://graphql.org/): A query language for APIs and a runtime for fulfilling those queries with your existing data
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

## Getting started

### 1. Clone this repository and install dependencies

Clone this repository:

```
git clone https://github.com/MATA62-TRABALHO-2022-1/api.git
```

Install npm dependencies:

```
cd api
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates tables for all models declared that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

If the seed fails, delete the "migrations" folder and the "dev.db" file that are inside the "prisma" folder and run the command from step 2 again.

### 3. Lint check and fix

Check if all code styles are right.

```
npm run lint:check
npm run lint:fix
```

### 4. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to explore the API of your GraphQL server.

---
