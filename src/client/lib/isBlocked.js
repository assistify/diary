export default function isBlocked(blockingItems) {
  return !!(blockingItems && blockingItems.length > 0 && blockingItems[0].title);
}
