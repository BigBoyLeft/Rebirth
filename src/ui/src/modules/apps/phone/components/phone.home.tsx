import Styles from "./home.module.scss";
import { Grow } from "@mui/material";
import apps from "./Apps";

const home = () => {
  return (
    <div className={Styles.Home}>
      <Grow in={true}>
        <div className={Styles.Wrapper}>
          {apps.map((app, index) => (
            <div className={Styles.app}>test</div>
          ))}
        </div>
      </Grow>
    </div>
  );
};

export default home;
