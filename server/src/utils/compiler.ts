import fs from "fs";
import ejs from "ejs";
import path from "path";
import get from "lodash/get";
import defaultsDeep from "lodash/defaultsDeep";

interface TemOptions {
  dir?: string;
  options?: ejs.Options;
}

export async function compileTemplate(
  tem: string,
  context?: Record<string, any>,
  options?: TemOptions
) {
  // set default values
  options = defaultsDeep(options, {
    dir: path.join(process.cwd(), "views"),
    options: { rmWhitespace: true },
  });
  const ejsOptions = get(options, "options", {});
  // base dir for template
  const templateBaseDir = get(options, "dir", "");
  // template ext
  const templateExt = path.extname(tem) || ".ejs";
  // get template name
  let templateName = path.basename(tem, path.extname(tem));
  // check if template is absolute
  const templateDir = path.isAbsolute(tem)
    ? path.dirname(tem)
    : path.join(templateBaseDir, path.dirname(tem));
  // template path
  const templatePath = path.join(templateDir, templateName + templateExt);
  // make template name
  templateName = path
    .relative(templateBaseDir, templatePath)
    .replace(templateExt, "");

  // finely read template file
  const template = fs.readFileSync(templatePath, "utf-8");

  // compile template
  const templateCompiled = ejs.compile(template, {
    ...ejsOptions,
    filename: templatePath,
  });
  // get html as a string
  return await templateCompiled({
    ...context,
  });
}
