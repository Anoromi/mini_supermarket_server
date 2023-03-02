import { supabase } from "./auth";

export async function getValue(key: string): Promise<unknown> {
  return (
    await supabase.rpc("cache_get_value", {
      p_key: key,
    })
  ).data;
}

export async function insertValue(key: string, value: unknown) {
  return (
    await supabase.rpc("cache_insert_value", {
      p_key: key,
      p_value: value,
    })
  ).data;
}
