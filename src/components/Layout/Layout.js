import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <>
      <MainNavigation className={classes} />
      <main>{props.children}</main>
      <Footer className={classes} />
    </>
  );
}
export default Layout;
