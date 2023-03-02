import * as bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { c as createError } from './netlify.mjs';

const authDataSchema = z.object({
  username: z.coerce.string(),
  password: z.coerce.string().min(7, "password must be above 7 characters")
});
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getValue(key) {
  return (await supabase.rpc("cache_get_value", {
    p_key: key
  })).data;
}
async function insertValue(key, value) {
  return (await supabase.rpc("cache_insert_value", {
    p_key: key,
    p_value: value
  })).data;
}

async function generateSalt() {
  const salt = await bcrypt.genSalt(10);
  await insertValue("salt", salt);
  return salt;
}
async function hashPassword(password) {
  var _a;
  const salt = (_a = await getValue("salt")) != null ? _a : await generateSalt();
  return bcrypt.hashSync(password, salt);
}

function clientError(message = "bad/data") {
  return createError({
    statusCode: 400,
    statusMessage: message
  });
}

export { authDataSchema as a, clientError as c, hashPassword as h, supabase as s };
//# sourceMappingURL=error.mjs.map
