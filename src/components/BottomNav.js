import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import history from "../history";

const useStyles = makeStyles({
  root: {
    backgroundColor: "violet",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onClick={(event, newValue) => {
        history.goBack();
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Return" icon={<RestoreIcon />} />
    </BottomNavigation>
  );
}
