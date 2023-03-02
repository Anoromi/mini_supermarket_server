import { authDataSchema } from "../../utils/auth";
import * as jose from "jose";
import { clientError } from "../../utils/error";

export default defineEventHandler(async (event) => {
  console.log("body", await readBody(event));
  const authData = authDataSchema.safeParse(await readBody(event));
  if (!authData.success) throw clientError("bad/data");

  console.log(authData.data);
  console.log(await hashPassword(authData.data.password));
  const uid = await supabase.rpc("signin", {
    p_username: authData.data.username,
    p_password: await hashPassword(authData.data.password),
  });

  if (uid.data === null) throw clientError("bad/user");

  const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
  const token = await new jose.SignJWT({ sub: uid.data })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  console.log(uid);

  return { token };
});
