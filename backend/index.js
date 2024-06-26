import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Router from './router/router.js';
import Logger from './handlers/logger.handler.js';
import "dotenv/config";
import upload from './middleware/upload.js';
import https from "https";
import fs from "fs";
const app = express();

// Define the port
const port = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let index = 0;
Object.keys(Router).forEach((method) => {
  Object.keys(Router[method]).forEach((path) => {
    Logger.log(`<${index}>  ${method}  http://localhost:${port}${path}`, 'warn');
    index += 1;
    (path.indexOf('upload') != -1 && method == 'post') && app[method](path, upload.single('file'), async (request, response) => {
      try {
        const result = await Router[method][path].bind({}, request, response, __dirname)();
      } catch (error) {
        Logger.log(JSON.stringify(error), 'error');
      }
    });
    (path.indexOf('upload') == -1) && app[method](path, async (request, response) => {
      try {
        const result = await Router[method][path].bind({}, request, response, __dirname)();
      } catch (error) {
        Logger.log(JSON.stringify(error), 'error');
      }
    })
  });
});


https
  .createServer(
    {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
      ca: fs.readFileSync(process.env.SSL_CA_PATH),
    },
    app
  )
  .listen(port, () => {
    Logger.log(`Server is listening on port ${port}`, "info");
  });