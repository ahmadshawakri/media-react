import React from "react";
import classes from "./PhotoData.module.css";

const PhotoData = ({ photo }) => {
  return (
    <div className={classes.photo}>
      <p>{photo.title}</p>
      <img src={photo.url} alt={photo.title} />
    </div>
  );
};

export default PhotoData;
