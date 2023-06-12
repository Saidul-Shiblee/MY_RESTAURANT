export function notificationMessage(status, id) {
  if (status === 1) {
    return `Order No. ${id} is being prepared`;
  }

  if (status === 2) {
    return `Order No. ${id} is on the way to deliver`;
  }

  if (status === 3) {
    return `Order No. ${id} is delivered`;
  }
  return null;
}
