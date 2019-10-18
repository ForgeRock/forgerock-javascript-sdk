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

interface Window {
  PublicKeyCredential: any;
}
