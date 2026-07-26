/// <reference types="astro/client" />

declare module "@pagefind/default-ui" {
  interface PagefindUIOptions {
    element: string | HTMLElement;
    showImages?: boolean;
    showSubResults?: boolean;
    resetStyles?: boolean;
  }

  export class PagefindUI {
    constructor(options: PagefindUIOptions);
  }
}
