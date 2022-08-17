import Card from "./UI/Card";

import classes from "./ArticleCard.module.css";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function ArticleCard(props) {
  //
  return (
    <li className={classes.list_item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.data.title}</h3>
          {/* multiple p's with multiple imgs */}
          <p>
            {props.data.articleText.slice(0, 300)}...
            <Link to={`/article/${props.data.id}`}>Read more</Link>
          </p>

          <div className={classes.author_date}>
            {props.data.author}
            <span>{props.data.date}</span>
          </div>
        </div>
        <div className={classes.image}>
          <img src={`${props.data.images[0]}`} alt="main-img" />
        </div>
      </Card>
    </li>
  );
}
export default ArticleCard;
