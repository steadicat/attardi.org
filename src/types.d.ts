declare module '*.svg' {
  const svg: string;
  export = svg;
}

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
}

interface Window {
  protectedEmailCallback?: (token: string) => void;
}
