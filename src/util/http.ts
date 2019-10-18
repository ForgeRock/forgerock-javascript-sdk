function isOkOr4xx(response: Response) {
  return response.ok || Math.floor(response.status / 100) === 4;
}

export { isOkOr4xx };
