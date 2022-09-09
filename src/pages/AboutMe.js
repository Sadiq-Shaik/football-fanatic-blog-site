import GoToTop from "../components/GoToTop";
import classes from "./AboutMe.module.css";

function AboutMe(props) {
  return (
    <div className={classes.abt_me}>
      <h3>
        Hi, I'm <span>Sadiq Shaik</span>
      </h3>
      <h3>Frontend Developer</h3>
      <p>
        Born in mid 90's in the historical city of Rajamundry, Andhra Pradesh
        and grew up ashtonished watching the technological development from CRT
        television, Dumb phones to Personal Computers, the Internet and
        Smartphones. Graduated B.Tech in Electronics and Communications
        Engineering in 2017 from GMR Institute of Technology, Rajam affiliated
        to University of JNTU, Kakinada. Fascinated with the rapid development
        in world of web technologies brought by NodeJS, Single Page Web Apps and
        API revolution, I decided to join this revolution of moving all
        traditional businesses towards Automation, Internet of Things, App based
        businesses as once said by Bill Gates
        <span>
          "If your business is not on the Internet, then your business will be
          out of business."
        </span>
      </p>
      <p>
        And what better way than learning the most popular JavaScript library,
        ReactJS followed by TypeScript and NextJS framework. I have learnt
        JavaScript, ReactJS, Git version control, HTML 5 CSS 3 from some of the
        best instructors on the whole Internet
        <a
          href="https://www.udemy.com/user/coltsteele/"
          target="_blank"
          rel="noreferrer"
        >
          Colt Steele
        </a>
        <a
          href="https://www.udemy.com/user/jonasschmedtmann/"
          target="_blank"
          rel="noreferrer"
        >
          Jonas Schmedtmann
        </a>
        <a
          href="https://www.udemy.com/user/maximilian-schwarzmuller/"
          target="_blank"
          rel="noreferrer"
        >
          Maximilian Schwarzmüller
        </a>
      </p>
      <p>
        This webiste is made possible by Firebase using its Realtime Database
        and Hosting Service which is priovided for free and built with create
        react-app by Facebook, react-router-dom by Remix. Souce code is
        available on
        <a
          href="https://github.com/Sadiq-Shaik/football-fanatic-blog-site"
          target="_blank"
          rel="noreferrer"
        >
          my GitHub repository.
        </a>
        For any improvements and suggestions, you can
        <a href="/contact">cantact me.</a>
      </p>
      <p>
        <a href="https://sadiqshaik.com" target="_blank" rel="noreferrer">
          Read more about me
        </a>
      </p>
      <GoToTop />
    </div>
  );
}
export default AboutMe;
