import { Config } from "@/utils/config";
import { appLoad } from "./load/app.load";
import { mailLoad } from "./load/mail.load";

const config = new Config({ path: ".env", loads: [appLoad, mailLoad] });

export default config;
