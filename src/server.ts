import express from "express";
import { router } from "./routes";

const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');

const privateKey = fs.readFileSync(__dirname + '/server.key');
const certificate = fs.readFileSync(__dirname + '/server.crt');

const credentials = { key: privateKey, cert: certificate };


const app = express();
const port = 8080;
const portHttps = 4430;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(express.json());

app.use(cors());

app.use(router);

const server = https.createServer(credentials, app);

const httpServer = http.createServer((req: any, res: any) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

httpServer.listen(port, () => console.log(`Server http is Running on PORT ${port}`));
server.listen(portHttps, () => console.log(`Server https is Running on PORT ${portHttps}`));
