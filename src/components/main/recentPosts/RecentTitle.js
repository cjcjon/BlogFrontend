import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginBottom: "12px",
  },
}));

function RecentTitle() {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={wordStyles.bold}>
        최신 작성글
      </Typography>
    </div>
  );
}

export default React.memo(RecentTitle);
