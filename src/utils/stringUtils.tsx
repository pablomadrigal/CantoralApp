export const getInitials = (nameString: string) => {
  const names = nameString.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getRandomStringAndNumber = (numberChar: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < numberChar; i += i) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomString = (numberChar: number) => {
  return (Math.random() + 1).toString(36).substring(numberChar);
};

export const insertSubStringAt = (
  str: string,
  index: number,
  value: string
) => {
  return str.slice(0, index) + value + str.slice(index);
};

export const nullableStringCompare = (
  a: string | null | undefined,
  b: string | null | undefined
) => {
  if (!a && b) return 1;
  if (a && !b) return -1;
  if (a && b)
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  return 0;
};
