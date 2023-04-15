
export default defineEventHandler(async (event) => {
  const authData = authDataSchema.safeParse(await readBody(event));
  console.log(authData, await readBody(event));
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
