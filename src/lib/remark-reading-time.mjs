import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const wordCount = textOnPage.split(/\s+/g).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    data.astro.frontmatter.readingTime = readingTime;
    data.astro.frontmatter.wordCount = wordCount;
  };
}
