/* eslint-disable jsx-a11y/anchor-has-content */
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
import Card from "../components/UI/Card";
import ArticleContext from "../store/blog-article-context";
import { MdThumbUp, MdComment, MdShare } from "react-icons/md";
import GoToTop from "../components/GoToTop";

import classes from "./Article.module.css";
import PleaseWait from "../components/UI/PleaseWait";

// firebase db
// import { getDatabase, ref } from "firebase/database";
// import firebaseDB from "../util/firebase";

// const database = getDatabase(firebaseDB);

function Article(props) {
  const { artId } = useParams();

  const [commentInputs, setCommentInputs] = useState({
    name: "",
    message: "",
  });

  // console.log(ref(database, "articles/" + artId));

  const artCtx = useContext(ArticleContext);

  const articleMain = artCtx.articles.find((art) => {
    return art.id.toString() === artId;
  });

  // console.log(...artCtx.articles);

  // console.log(articleMain);

  // artCtx.addHits(articleMain);

  if (articleMain === undefined) {
    return <PleaseWait />;
  } else {
    artCtx.addHits(articleMain);
  }

  let paras;

  if (articleMain?.articleText) {
    paras = articleMain.articleText.split("[EOP]");
  }

  // comment handling

  const commentDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCommentInputs((val) => ({ ...val, [name]: value }));
  };

  // const commentAuthorHandler = (e) => {
  //   setCommentInputs((prevState) => {
  //     return {
  //       ...prevState,
  //       name: e.target.value,
  //     };
  //   });
  // };

  // const commentTextHandler = (e) => {
  //   setCommentInputs((prevState) => {
  //     return {
  //       ...prevState,
  //       message: e.target.value,
  //     };
  //   });
  // };

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    artCtx.addComment({
      article_id: artId,
      data: articleMain.comments
        ? [...articleMain?.comments, commentInputs]
        : [commentInputs],
    });

    setCommentInputs({ name: "", message: "" });
  };

  // console.log(paras);
  const likeCountHandler = async function () {
    // let prevCount = Number(articleMain.likes);
    // const response = await fetch(
    //   `https://football-fanatic-default-rtdb.asia-southeast1.firebasedatabase.app/articles[${articleMain.id}].likes.json`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(prevCount++),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await response.json();
    // console.log(data);
  };

  return (
    <Card className={classes.container}>
      <Card className={classes.main}>
        <h2>{articleMain.title}</h2>
        <p className={classes.authorDate}>
          {articleMain.author} <span>{articleMain.date}</span>
        </p>
        <Card className={classes.imgCard}>
          <img src={articleMain.images[0]} alt="main-img" />
          {/* <p>
            Image Source: <a href={articleMain.images[0]}> Link</a>
          </p> */}
        </Card>
        <div>
          {paras.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Card>
      {/* <Card className={classes.icons}>
        <button className={classes.icon} onClick={likeCountHandler}>
          <MdThumbUp /> {articleMain.likes}
        </button>
        <button className={classes.icon}>
          <MdComment /> {articleMain.comments?.length}
        </button>
        <button className={classes.icon}>
          <MdShare />
          Share
        </button>
      </Card> */}
      <Card>
        <form onSubmit={commentSubmitHandler} className={classes.comment_form}>
          <h3>Leave a comment!</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={commentDataHandler}
              type="text"
              placeholder="Your name"
              name="name"
              value={commentInputs.name}
              required
            />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <input
              onChange={commentDataHandler}
              name="message"
              placeholder="Comment here"
              value={commentInputs.message}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className={classes.comments}>
          <h2>Comments</h2>
          <ul>
            {articleMain.comments
              ?.slice(0)
              ?.reverse()
              ?.map((cmt, i) => {
                return (
                  <li key={i} className={classes.list_item}>
                    <h3>{cmt.name}</h3>
                    <p>{cmt.message}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </Card>
      <GoToTop />
    </Card>
  );
}
export default Article;
