import showdown from 'showdown';
import htmlToText from 'html-to-text';


export const safeMarkdown = markdown => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);
  const text = htmlToText.fromString(html, {
    ignoreHref: true,
    uppercaseHeadings: false
  });
  return text;
};


export const toHtml = markdown => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);
  return html;
};
