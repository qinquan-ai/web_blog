import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTimeResult = readingTime(textOnPage);
    // 强制转换为需要的格式，比如 "5 min"
    const minutes = Math.ceil(readingTimeResult.minutes);
    data.astro.frontmatter.readingTime = `${minutes} min`;
  };
}
