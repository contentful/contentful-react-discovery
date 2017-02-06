export function longNameShort (name, maxLength) {
  if (name.length > maxLength) {
    name = name.substring(0, (maxLength - 3))
    name += '...'
  }
  return name
}
