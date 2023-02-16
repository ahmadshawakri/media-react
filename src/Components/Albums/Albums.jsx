import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import Card from "../UI/Card";
import Headers from "../UI/Headers";
import AlbumData from "./AlbumData";
import classes from "./Albums.module.css"

const Albums = () => {
  const { userState } = useContext(userContext);
  const [albumState, setAlbumState] = useState({
    albums: [],
    isLoaded: false,
  });
  const loggedUser = userState.userInfo;

  useEffect(() => {
    const loadAlbums = async () => {
      const albumsData = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${loggedUser.id}/albums`
      );
      if (albumsData.data.length !== 0) {
        setAlbumState({
          albums: albumsData.data,
          isLoaded: true,
        });
      }
    };
    loadAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.card}>
      <Headers head="Albums" />
      {albumState.isLoaded &&
        albumState.albums.map((album) => (
          <AlbumData key={album.id} albumInfo={album} />
        ))}
    </Card>
  );
};

export default Albums;
