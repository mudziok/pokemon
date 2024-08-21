import { pokemonSummarySchema } from "@/api/pokemon/schema";
import { z } from "zod";

const nameLengthRequirementMessage = "Required from 2 to 20 symbols";
const ageRangeRequirementMessage = "Required range from 16-99";

export const trainerSchema = z.object({
  name: z
    .string()
    .min(2, nameLengthRequirementMessage)
    .max(20, nameLengthRequirementMessage),
  age: z.coerce
    .number()
    .int()
    .min(16, ageRangeRequirementMessage)
    .max(99, ageRangeRequirementMessage),
  pokemon: pokemonSummarySchema,
});

export type Trainer = z.infer<typeof trainerSchema>;
