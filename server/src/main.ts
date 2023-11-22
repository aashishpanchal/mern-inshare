import chalk from "chalk";
import config from "@/config";
import logger from "@/common/logger";
import { App } from "./app";

async function main() {
  // create app
  const app = await App();
  // get port and host from config
  const port = config.getOrThrow<number>("port");
  const host = config.getOrThrow<string>("host");
  // server start
  app.listen(port, host, () =>
    logger.log(`🔥Server Listening ${chalk.cyan(`http://${host}:${port}`)}`)
  );
}

main();
