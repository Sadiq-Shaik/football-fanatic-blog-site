import classes from "./PleaseWait.module.css";

function PleaseWait() {
  return (
    <div className={classes.wait}>
      <div>Loading...</div>
      <div>Please Wait....</div>
    </div>
  );
}

export default PleaseWait;
