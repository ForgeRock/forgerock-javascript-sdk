const delay = 0;
export default function wait(req, res, next) {
  setTimeout(() => next(), delay);
}
