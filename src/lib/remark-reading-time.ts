import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { VFile } from "vfile";

interface AstroFrontmatter {
  readingTime?: number;
  wordCount?: number;
}

interface AstroData {
  astro: {
    frontmatter: AstroFrontmatter;
  };
}

/**
 * Remark plugin that calculates reading time and word count for MDX content.
 * Adds readingTime (in minutes) and wordCount to the frontmatter.
 */
export function remarkReadingTime() {
  return (tree: Root, file: VFile): void => {
    const data = file.data as AstroData;
    const textOnPage = mdastToString(tree);
    const wordCount = textOnPage.split(/\s+/g).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    data.astro.frontmatter.readingTime = readingTime;
    data.astro.frontmatter.wordCount = wordCount;
  };
}
