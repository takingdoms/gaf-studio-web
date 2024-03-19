export namespace HtmlUtils {
  export function justBlurIt() {
    (document.activeElement as HTMLElement | undefined)?.blur();
  }
}
