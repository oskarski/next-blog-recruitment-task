type EnvVariable = 'NEXT_PUBLIC_API_BASE_URL';

export const env = (name: EnvVariable): string => {
  const value = process.env[name];

  if (!value) throw new Error(`Missing env variable: "${name}"!`);

  return value;
};
