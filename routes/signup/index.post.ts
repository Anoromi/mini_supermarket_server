import { clientError } from "../../utils/error";

export default defineEventHandler(async (event) => {
  const authData = authDataSchema.safeParse(await readBody(event));
  if (!authData.success) throw clientError("bad/data");

  console.log(authData.data);

  const result = await supabase.rpc("signup", {
    p_username: authData.data.username,
    p_password: await hashPassword(authData.data.password),
  });

  if (result.error !== null) {
    console.log(result);
    throw clientError("bad/user");
  }

  return {};
});
