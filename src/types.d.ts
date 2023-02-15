declare module '*.svg' {
  const svg: string;
  export = svg;
}

interface Window {
  protectedEmailCallback?: (token: string) => void;
}
