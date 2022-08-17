import { createContext } from "react";

const ArticleContext = createContext([
  {
    id: "",
    imgs: [],
    title: "",
    articleText: "",
    author: "",
    date: "",
    hits: 0,
    likes: 0,
    comments: [],
    addArticle: () => {},
    removeArticle: () => {},
    populateArticles: (data) => {},
    addComment: (data) => {},
  },
]);

export default ArticleContext;
