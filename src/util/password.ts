import * as bcrypt from 'bcrypt';

const pepper = 'pepper';
const saltRounds = 10;

export async function generateHash(password: string): Promise<string> {
  const pepperedPassword = `${password}${pepper}`;

  const hash = await bcrypt.hash(pepperedPassword, saltRounds);
  return hash;
}

export async function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(`${password}${pepper}`, hash);
}
