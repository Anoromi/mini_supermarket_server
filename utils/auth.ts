import { createClient } from "@supabase/supabase-js";
import config from "nitropack/dist/runtime/config";
import { z } from "zod";

export const authDataSchema = z.object({
	username: z.coerce.string(),
	password: z.coerce.string().min(7, "password must be above 7 characters"),
})


export const supabase =
  createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
