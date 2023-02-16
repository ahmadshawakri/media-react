import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../UI/Headers";
import Card from "../UI/Card";
import PhotoData from "./PhotoData";
import classes from "./Photos.module.css";

const Photos = (props) => {
  const { id } = useParams();
  const [photosState, setPhotosState] = useState({
    photos: [],
    isLoaded: false,
  });

  useEffect(() => {
    const loadPhotos = async () => {
      const photosData = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`
      );
      if (photosData.data) {
        setPhotosState({
          photos: photosData.data,
          isLoaded: true,
        });
      }
    };
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Headers head="Photos" />
      <Card className={classes.card}>
        {photosState.isLoaded &&
          photosState.photos.map((photo) => (
            <PhotoData key={photo.id} photo={photo} />
          ))}
      </Card>
    </>
  );
};

export default Photos;
