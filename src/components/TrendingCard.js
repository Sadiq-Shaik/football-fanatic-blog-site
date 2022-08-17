import classes from "./TrendingCard.module.css";

function TrendingCard(props) {
  // console.log(props.data.images[0]);

  return (
    <div
      style={{
        backgroundImage: `url(${props.data.images[0]})`,
      }}
      className={classes.tr_card}
    >
      <div className={classes.overlay}>
        <h3>{props.data.title}</h3>
        <div>
          <p>
            {props.data.author} <span>{props.data.date}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default TrendingCard;
