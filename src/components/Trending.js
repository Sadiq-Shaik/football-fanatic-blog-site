import { useContext } from "react";

import ArticleContext from "../store/blog-article-context";
import TrendingCard from "./TrendingCard";

import { Link } from "react-router-dom";

import classes from "./Trending.module.css";

const compareFn = (a, b) => {
  if (a.hits > b.hits) {
    return -1;
  }

  if (a.hits < b.hits) {
    return 1;
  }

  return 0;
};

function Trending() {
  const articleCtx = useContext(ArticleContext);

  // console.log(articleCtx);

  // const arrayofArticles = Object.keys(articleCtx.articles).map((key) => {
  //   return articleCtx.articles[key];
  // });

  // console.log(articleCtx.articles);

  const sortedArticles = articleCtx.articles.sort(compareFn).slice(0, 3);

  // console.log(sortedArticles);

  return (
    <>
      <h2 className={classes.header}>Trending Articles</h2>
      <div className={classes.trending}>
        {/* <ul>
        {sortedArticles.map((art) => {
          return (
            <Link to="#" key={art.id}>
              <TrendingCard data={art} />
            </Link>
          );
        })}
      </ul> */}

        {sortedArticles.map((art) => {
          return (
            <Link to={`/article/${art.id}`} key={art.id}>
              <TrendingCard
                data={art}
                highest={sortedArticles[0].id === art.id ? true : false}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default Trending;
