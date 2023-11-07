export function removeHTMLTags(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}
