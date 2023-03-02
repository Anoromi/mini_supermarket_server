import { d as defineEventHandler, r as readBody } from './netlify.mjs';
import { a as authDataSchema, c as clientError, h as hashPassword, s as supabase } from './error.mjs';
import * as jose from 'jose';
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
  console.log("body", await readBody(event));
  const authData = authDataSchema.safeParse(await readBody(event));
  if (!authData.success)
    throw clientError("bad/data");
  console.log(authData.data);
  console.log(await hashPassword(authData.data.password));
  const uid = await supabase.rpc("signin", {
    p_username: authData.data.username,
    p_password: await hashPassword(authData.data.password)
  });
  if (uid.data === null)
    throw clientError("bad/user");
  const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
  const token = await new jose.SignJWT({ sub: uid.data }).setProtectedHeader({ alg: "HS256" }).sign(secret);
  console.log(uid);
  return { token };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
