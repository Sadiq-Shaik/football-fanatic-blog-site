import { Link } from "react-router-dom";

function Footer(props) {
  // console.log(props.className);

  return (
    <footer className={props.className.footer}>
      <div className={props.className.footer_logo}>
        <Link to="/">
          <img src="ronaldo.png" alt="ronaldo_image" />
          <h2>Football Fanatic</h2>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          |
          <li>
            <Link to="/aboutme">About me</Link>
          </li>
          |
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className={props.className.built}>
        <p>Built with React</p>
        <img src="./logo192.png" alt="react logo" />
      </div>
      <div className={props.className.copy}>
        <p>
          &copy; Designed & Developed by <Link to="/aboutme">Sadiq Shaik</Link>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
