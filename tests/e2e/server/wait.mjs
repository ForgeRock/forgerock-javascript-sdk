const delay = 0;
export default async function wait() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}
