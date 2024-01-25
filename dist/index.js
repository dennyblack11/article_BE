"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = require("./utils/dbConfig");
const mainApp_1 = require("./mainApp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import MongoDB from "connect-mongodb-session";
// import session from "express-session"
// const MongoDBStore = MongoDB(session);
// const store = new MongoDBStore({
//   uri: process.env.MONGO_DB_URL!,
//   collection: "sessions",
// });
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use((0, cors_1.default)({ origin: "http://localhost:5174" }));
app.use(express_1.default.json());
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
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log("Server Listening to port on", port);
    console.log();
    (0, dbConfig_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection", reason);
    server.close(() => {
        process.exit(1);
    });
});
