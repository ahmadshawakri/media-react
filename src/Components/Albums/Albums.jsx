import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../Context/UserContext";

const Albums = () => {
  const { userState } = useContext(userContext);
  const [albumState, setAlbumState] = useState({
    albums: [],
    isLoaded: false,
  });
  const loggedUser = userState.userInfo;
  // console.log(userState.userInfo);

  useEffect(() => {
    const loadAlbums = async () => {
      const albumsData = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${loggedUser.id}/albums`
      );
      if (albumsData.data.length !== 0) {
        console.log(albumsData.data);
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
    <>
      <p>Hello</p>
      {albumState.isLoaded &&
        albumState.albums.map((album) => (
          <div key={album.id}>
            <p>{album.title}</p>
          </div>
        ))}
    </>
  );
};

export default Albums;
