function getRealmUrlPath(realmPath?: string) {
  // Split the path and scrub segments
  const names = (realmPath || '')
    .split('/')
    .map((x) => x.trim())
    .filter((x) => x !== '');

  // Ensure 'root' is the first realm
  if (names[0] !== 'root') {
    names.unshift('root');
  }

  // Concatenate into a URL path
  const urlPath = names.map((x) => `realms/${x}`).join('/');
  return urlPath;
}

export { getRealmUrlPath };
