import GoToTop from "../components/GoToTop";
import classes from "./AboutMe.module.css";

function AboutMe(props) {
  return (
    <div className={classes.abt_me}>
      <h2>
        Hi, I'm <span>Sadiq Shaik</span>
      </h2>
      <h3>Web Developer</h3>
      <p>
        The bowl was filled with fruit. It seemed to be an overabundance of
        strawberries, but it also included blueberries, raspberries, grapes, and
        banana slices. This was the meal Sarah had every morning to start her
        day since she could remember. Why she decided to add chocolate as an
        option today was still a bit of a surprise, but she had been in the
        process of deciding she wanted to change her routine. This was a baby
        step to begin that start.
      </p>
      <p>
        Turning away from the ledge, he started slowly down the mountain,
        deciding that he would, that very night, satisfy his curiosity about the
        man-house. In the meantime, he would go down into the canyon and get a
        cool drink, after which he would visit some berry patches just over the
        ridge, and explore among the foothills a bit before his nap-time, which
        always came just after the sun had walked past the middle of the sky. At
        that period of the day the sun's warm rays seemed to cast a sleepy spell
        over the silent mountainside, so all of the animals, with one accord,
        had decided it should be the hour for their mid-day sleep.
      </p>
      <p>
        It wasn't that he hated her. It was simply that he didn't like her much.
        It was difficult for him to explain this to her, and even more difficult
        for her to truly understand. She was in love and wanted him to feel the
        same way. He didn't, and no matter how he tried to explain to her she
        refused to listen or to understand.
      </p>
      <GoToTop />
    </div>
  );
}
export default AboutMe;
