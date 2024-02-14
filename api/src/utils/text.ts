export const padLeft = (str: string, char: string, count: number) => {
 return (Array(count).join(char) + str).slice(-count);
};

export function padStr (char: string, num: number, length: number) {
  let res = num.toString();
  while (res.length < length) res = char + res;
  return res;
}
