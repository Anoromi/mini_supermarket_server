import * as bcrypt  from 'bcrypt'
import { getValue, insertValue } from './storage';

export async function generateSalt() {
  const salt = await bcrypt.genSalt(10)
  await insertValue('salt', salt)
  return salt
}

export async function hashPassword(password: string) {

  const salt = (await getValue('salt') as string) ?? await generateSalt()
	return bcrypt.hashSync(password, salt)
}