import React from "react";
import { IUnsplash } from "./Interfaces";

interface IProps {
  image: IUnsplash;
  key: number;
}

const PhotoDisplay = (props: IProps) => {
  const { image, key } = props;
  console.log(props);
  console.log(image);

  return (
    <div>
      <div>
        {/* <h4>{image.artist}</h4>
        <a href={image.portfolio_url}>
          <img src={image.artist_image} alt={image.artist} />
        </a>
        <img src={image.url_regular} alt="na" /> */}
      </div>
    </div>
  );
};

export default PhotoDisplay;
