import { allPosts } from "content-collections";

export const remarkToc = (content: string): string => {
  const tocItems = generateToc(content);
  const tocMarkdown = generateTocMarkdown(tocItems);
  return tocMarkdown;
}

export const generateToc = (content: string): TocItem[] => {
  const headings = content.match(/(#{1,6})\s+(.+)/g) || [];
  return headings.map((heading) => {
    const [, hashes, text] = heading.match(/(#{1,6})\s+(.+)/) || [];
    return {
      id: text.toLowerCase().replace(/[^\w]+/g, "-"),
      text,
      level: hashes.length,
    };
  });
}

export const generateTocMarkdown = (tocItems: TocItem[]): string => {
  return tocItems.map(item => `${'  '.repeat(item.level - 1)}- [${item.text}](#${item.id})`).join('\n');
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}

export async function getPostsByTag(tag: string) {
  const posts = allPosts;
  return posts.filter(post => post.tags.includes(tag));
}

export async function getAllTags() {
  const posts = allPosts;
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}
