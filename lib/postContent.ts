// Helpers for reading structured pieces out of a post's HTML content.
// Shared by the blog post page (FAQPage schema) and the llms.txt routes.

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .replace(/ ([.,!?;:])/g, "$1")
    .trim();
}

// Pulls FAQ question/answer pairs out of a post's HTML so they can be emitted as
// FAQPage structured data. Expects the house convention:
//   <h2>Frequently Asked Questions</h2> <h3>Question</h3> <p>Answer</p> ...
// Posts without that section simply yield no pairs (and no FAQ schema).
export function extractFaqs(
  html: string
): { question: string; answer: string }[] {
  const section = html.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i
  );
  if (!section) return [];

  const faqs: { question: string; answer: string }[] = [];
  const pair = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[\s>]|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = pair.exec(section[1])) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}
