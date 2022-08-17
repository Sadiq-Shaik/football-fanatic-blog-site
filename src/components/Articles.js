import { useContext } from "react";
import ArticleCard from "./ArticleCard";

import ArticleContext from "../store/blog-article-context";

import classes from "./Articles.module.css";

const compareFn = (a, b) => {
  if (Date.parse(a.date) >= Date.parse(b.date)) {
    return -1;
  }

  if (a.hits < b.hits) {
    return 1;
  }

  return 0;
};

function Articles(props) {
  // console.log(props.articles[0].author);

  const articleCtx = useContext(ArticleContext);

  // console.log(articleCtx);

  const sortedByLatest = articleCtx.articles.sort(compareFn);

  return (
    <ul className={classes.articles_container}>
      <h2>Latest Articles</h2>
      {/* {articleCtx.articles
        .map((article) => (
          <ArticleCard
            className={classes.list_items}
            key={article.id}
            data={article}
          />
        ))
        .reverse()} */}
      {sortedByLatest.map((article) => (
        <ArticleCard
          className={classes.list_items}
          key={article.id}
          data={article}
        />
      ))}
    </ul>
  );
}
export default Articles;
