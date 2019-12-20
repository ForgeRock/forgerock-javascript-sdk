/** @hidden */
function isOkOr4xx(response: Response): boolean {
  return response.ok || Math.floor(response.status / 100) === 4;
}

export { isOkOr4xx };
