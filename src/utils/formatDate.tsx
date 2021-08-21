export function formatDate(date: string | undefined) {
  let birth = date?.split("T");
  return birth && birth[0];
}
