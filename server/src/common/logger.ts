import config from "@/config";
import { Logger } from "@/utils/logger";

const logger = new Logger(config.get("NAME"));

export default logger;
