export const appLoad = () => {
  const node_env = process.env["NODE_ENV"] || "development";

  const is_dev = node_env === "development";

  return {
    is_dev,
    node_env,
    name: process.env.NAME,
    host: process.env.HOST,
    port: Number(process.env.PORT),
  };
};
