import { useContext } from "react";
import Articles from "../components/Articles";
import Trending from "../components/Trending";

import ArticleContext from "../store/blog-article-context";
import PleaseWait from "../components/UI/PleaseWait";
import GoToTop from "../components/GoToTop";

function Home(props) {
  const articleCtx = useContext(ArticleContext);

  // console.log(articleCtx);

  // const arrayofArticles = Object.keys(articleCtx.articles).map((key) => {
  //   return articleCtx.articles[key];
  // });

  console.log(articleCtx.articles);

  if (articleCtx.articles.length <= 1) {
    return <PleaseWait />;
  }

  return (
    <>
      <Trending />
      <Articles />
      <GoToTop />
    </>
  );

  // return (
  //   <main>
  //     {articleData.map((art) => (
  //       <Card className="articlesCard" key={art.id}>
  //         <h3>{art.title}</h3>
  //         <img
  //           width="300px"
  //           height="200px"
  //           src={`${art.imgs[0]}`}
  //           alt="art img"
  //         />
  //         {/* {art.articleText.map} */}
  //         <p>{art.articleText}</p>
  //         <Link to="#">Read more</Link>
  //       </Card>
  //     ))}
  //   </main>
  // );
}
export default Home;
