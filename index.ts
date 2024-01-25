console.clear();
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
import dotenv from "dotenv";
dotenv.config();

// import MongoDB from "connect-mongodb-session";
// import session from "express-session"

// const MongoDBStore = MongoDB(session);
// const store = new MongoDBStore({
//   uri: process.env.MONGO_DB_URL!,
//   collection: "sessions",
// });

const app: Application = express();

const port: number = parseInt(process.env.PORT!);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", process.env.APP_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

// app.use(
//     session({
//       secret: process.env.SESSION_SECRET!,
//       resave: false,
//       saveUninitialized: false,

//       cookie: {
//         maxAge: 1000 * 60 * 24 * 60,
//         sameSite: "lax",
//         secure: false,
//       },

//       store,
//     })
//   );

mainApp(app);

const server = app.listen(port, () => {
  console.log("Server Listening to port on", port);
  console.log();
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
