import Card from "./components/UI/Card";
import { Outlet } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import ArticleContext from "./store/blog-article-context";

// import { getDatabase, ref, get, child } from "firebase/database";

import "./util/firebase";

// import { ref, set } from "firebase/database";

function App() {
  return (
    <Card className="large_card">
      <Outlet />
    </Card>
  );
}

export default App;

// if (isFetching) {
//   return <h3>Data is being fetched. Please wait</h3>;
// }

// fetch articles
// const fetchedArticleData = articles;

// need to sorted ****
// const trending = JSON.parse(JSON.stringify(fetchedArticleData));

// const trendingArticles = fetchedArticleData.sort();
// }

////////////////////////////////////////////////////////////////////////////////////

// if (isFetching === false) {
// console.log(articlesCtx);

// if (isFetching) {
// return <h3>Data is being fetched.</h3>;
// } else if (!isFetching)

// useEffect(() => {
//   const fetchedData = async function () {
//     const response = await fetch(
//       "https://football-fanatic-default-rtdb.asia-southeast1.firebasedatabase.app/articles.json"
//     );

//     const data = await response.json();

//     setFetchedArticles(data);
//     // setIsFetching(false);
//     // console.log("....running.....");
//   };

//   fetchedData();
// }, []);
