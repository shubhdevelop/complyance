import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().nonnegative().min(1),
  description: z.string(),
  type: z.string(),
});
