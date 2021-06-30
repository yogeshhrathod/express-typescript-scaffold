import express from "express";
import helmet from "helmet";
import * as httpErrors from "http-errors";
import Config from "./config/config";
import { rootRouter } from "./modules";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(compression());

app.use(helmet());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader(
      "Content-Security-Policy",
      "style-src 'unsafe-inline' 'self' 'unsafe-eval';"
    );
    res.setHeader(
      "X-Content-Security-Policy",
      "style-src 'unsafe-inline' 'self' 'unsafe-eval';"
    );
    next();
  }
);
app.disable("x-powered-by");

app.use("/api/", rootRouter);

// catch 404 and forward to error handler
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(httpErrors[404]);
  }
);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(Config.port, () => {
  console.log(`Express with Typescript! http://localhost:${Config.port}`);
});
