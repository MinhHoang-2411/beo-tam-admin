export function countTotalElements(...items: any[]): number {
  let totalElements = 0;
  for (const item of items) {
    if (Array.isArray(item)) {
      totalElements += item.length;
    }
  }
  return totalElements;
}
