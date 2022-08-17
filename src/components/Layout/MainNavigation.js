import { Link } from "react-router-dom";

function MainNavigation(props) {
  //
  return (
    <div className={props.className.main_nav}>
      <div className={props.className.logo}>
        <img src="ronaldo.png" alt="ronaldo_image" />
        <h1>
          <Link to="/">Football Fanatic</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/aboutme">About me</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
export default MainNavigation;
