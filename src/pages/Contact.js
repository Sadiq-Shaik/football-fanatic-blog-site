import GoToTop from "../components/GoToTop";
import classes from "./Contact.module.css";

function Contact(props) {
  return (
    <div className={classes.contact}>
      <h2>Contact me!</h2>
      <form
        className={classes.contact_form}
        action="https://formsubmit.co/sadiqshaik@protonmail.com"
        method="POST"
      >
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            type="textarea"
            placeholder="Enter your message"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <GoToTop />
    </div>
  );
}
export default Contact;
