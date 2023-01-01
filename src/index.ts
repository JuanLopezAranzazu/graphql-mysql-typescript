import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
// schemas
import { schema } from "./Schemas/index";
// entities
import { User } from "./Entities/User";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "db-graphql",
    username: "root",
    password: "root123",
    logging: true,
    synchronize: false,
    entities: [User],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
};

main().catch((error) => {
  console.log(error);
});
