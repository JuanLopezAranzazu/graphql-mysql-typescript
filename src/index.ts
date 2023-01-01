import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
// schemas
import { schema } from "./Schemas/index";
// entities
import { User } from "./Entities/User";
// config
import { config } from "./config";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: config.dbName,
    username: config.dbUser,
    password: config.dbPassword,
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

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

main().catch((error) => {
  console.log(error);
});
