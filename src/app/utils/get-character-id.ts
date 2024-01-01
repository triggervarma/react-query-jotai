
export const getCharacterId = (url: string) => {
  const path = url.split("https://swapi.dev/api/people/")[1];
  return path?.slice(0, path.length - 1);
};
