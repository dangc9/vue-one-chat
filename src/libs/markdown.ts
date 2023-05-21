import Markdown from "markdown-it";
// import highlight from "highlight.js";
import mdHighlight from "markdown-it-highlightjs"

const mdOptions: Markdown.Options = {
  linkify: true,
  breaks: true
  // linkify: true,
  // typographer: true,
  // breaks: true,
  // langPrefix: "language-",
  // 代码高亮
  // highlight(str, lang) {
  //   if (lang && highlight.getLanguage(lang)) {
  //     try {
  //       return (
  //         '<pre class="hljs"><code>' +
  //         highlight.highlight(lang, str, true).value +
  //         "</code></pre>"
  //       );
  //     } catch (__) {}
  //   }
  //   return "";
  // },
};
const md = Markdown(mdOptions).use(mdHighlight, {
  inline: true
});

export default md;
