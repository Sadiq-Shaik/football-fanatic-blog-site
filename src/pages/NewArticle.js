import { useContext, useState } from "react";

import ArticleContext from "../store/blog-article-context";
import classes from "./NewArticle.module.css";

function NewArticle(props) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    articleText: "",
    images: [],
    date: "",
    hits: 0,
    likes: 0,
    comments: [{}],
  });

  const artCtx = useContext(ArticleContext);

  const formDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((val) => ({ ...val, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log(formData);

    artCtx.addArticle({
      ...formData,
      date: new Date().toDateString().slice(4),
      images: formData.images.split(" "),
    });
  };

  return (
    <div className={classes.new_article}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h2>Write a new article!</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter the title for your article"
            name="title"
            value={formDataHandler.title}
            onChange={formDataHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            value={formDataHandler.author}
            placeholder="Your name"
            name="author"
            onChange={formDataHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="images">Image URLs</label>
          <input
            type="text"
            placeholder="Image URLs separated by ','"
            name="images"
            value={formDataHandler.images}
            onChange={formDataHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="articleText">Article</label>
          <textarea
            type="text"
            placeholder="Write your aticle here"
            name="articleText"
            required
            value={formDataHandler.articleText}
            onChange={formDataHandler}
            rows="15"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewArticle;
