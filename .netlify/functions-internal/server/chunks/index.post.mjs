import { d as defineEventHandler, r as readBody } from './netlify.mjs';
import { a as authDataSchema, c as clientError, s as supabase, h as hashPassword } from './error.mjs';
import 'node-fetch-native/polyfill';
import 'ufo';
import 'destr';
import 'scule';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'ohash';
import 'unstorage';
import 'bcrypt';
import '@supabase/supabase-js';
import 'zod';

const index_post = defineEventHandler(async (event) => {
  const authData = authDataSchema.safeParse(await readBody(event));
  if (!authData.success)
    throw clientError("bad/data");
  console.log(authData.data);
  const result = await supabase.rpc("signup", {
    p_username: authData.data.username,
    p_password: await hashPassword(authData.data.password)
  });
  if (result.error !== null) {
    console.log(result);
    throw clientError("bad/user");
  }
  return {};
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
