import { Prisma } from "@prisma/client";

export default Prisma.defineExtension((client) => {
  return client.$extends({
    model: {
      $allModels: {
        async findById<T, K extends Prisma.Result<T, null, "findUnique">>(
          this: T,
          id: string
        ) {
          const context = Prisma.getExtensionContext(this);
          const result: K = await (context as any).findUnique({
            where: { id },
          });
          return result;
        },
      },
    },
  });
});
