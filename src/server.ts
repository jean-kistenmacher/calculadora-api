import express from "express";
const cors = require('cors');

import { router } from "./routes";

const app = express();
const port = 8080;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port, () => console.log(`Server is Running on PORT ${port}`))
