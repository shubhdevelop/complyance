import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
});
