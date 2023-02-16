import React from "react";
import classes from "./AlbumsData.module.css";
import { useNavigate } from "react-router-dom";

const AlbumData = ({ albumInfo }) => {
  const navigateTo = useNavigate();
  const albumClickHandler = () => {
    console.log(albumInfo.id);
    navigateTo(`/photos/${albumInfo.id}`);
  };

  return (
    <div className={classes.album} onClick={albumClickHandler}>
      <p>{albumInfo.title}</p>
    </div>
  );
};

export default AlbumData;
