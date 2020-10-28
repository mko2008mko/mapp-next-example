declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
// declare module '*.svg' {
//   export function ReactComponent(
//     props: React.SVGProps<SVGSVGElement>,
//   ): React.ReactElement;
//   const url: string;
//   export default url;
// }
