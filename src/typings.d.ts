declare module '*.html' {
  const content: string;
  export = content;
}

declare module '*.css' {
  const content: string;
  export = content;
}

declare module '*.scss' {
  const content: string;
  export = content;
}

declare module 'fake-indexeddb/auto'

interface Window {
  PublicKeyCredential: any;
}
