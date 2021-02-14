import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import PostThumbnail from "./PostThumbnail";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
  listItem: {
    marginBottom: "4rem",
  },
}));

function PostList({ seriesInfo, postList }) {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      <Divider style={{ marginBottom: "24px" }} />
      {postList &&
        postList.map((data, idx) => (
          <div className={classes.listItem} key={data.id}>
            <PostThumbnail
              seriesInfo={seriesInfo}
              href={`/posts/${data.id}`}
              number={idx + 1}
              post={data}
            />
          </div>
        ))}
    </div>
  );
}

export default React.memo(PostList);
