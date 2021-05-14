import React, { useReducer, FC, Fragment, useEffect, Dispatch } from "react";
import { render } from "react-dom";
import {
  getSearchPhotos,
  Photo,
  SearchPhotosResponse
} from "./helpers/requests";
import {
  setPhotosResponse,
  addPhotos,
  photosReducer,
  PhotosState
} from "./store/photos";
import InfiniteScroll from "react-infinite-scroller";


const PhotoComp: React.FC<{ photo: Photo }> = React.memo(({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </Fragment>
  );
});

const Feed: FC<{
  fetchData: (page: number) => Promise<any>;
  data: Extract<PhotosState, { tag: "success" }>;
  dispatch: Dispatch<any>;
}> = ({ fetchData, data, dispatch }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { photos, total, page } = data;
  const hasMore = photos.length < total && !isLoading;

  const loadMore = React.useCallback(() => {
    setIsLoading(true);
    fetchData(page + 1)
      .then(result => {
        if (result.errors) {
          dispatch(setPhotosResponse({ tag: "failure" }));
        } else {
          const apiData: SearchPhotosResponse = result.response;
          dispatch(addPhotos({ photos: apiData.results }));
        }
      })
      .catch(() => dispatch(setPhotosResponse({ tag: "failure" })))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const divRef = React.createRef<HTMLDivElement>();

  return (
    <div className="scrollContainer" ref={divRef}>
      <InfiniteScroll
        hasMore={hasMore}
        loadMore={loadMore}
        loader={<div key={"loader"} />}
        pageStart={1}
        initialLoad={false}
        getScrollParent={() => divRef.current}
        useWindow={false}
        threshold={500}
      >
        <div className="feed">
          <ul className="columnUl">
            {photos.map(photo => (
              <li key={photo.id} className="li">
                <PhotoComp photo={photo} />
              </li>
            ))}
          </ul>
        </div>
      </InfiniteScroll>
    </div>
  );
};

const fetchData = (page: number) => {
  return getSearchPhotos("cat", page);
};

const Body: React.FC = () => {
  const [data, dispatch] = useReducer(photosReducer, { tag: "initial" });

  useEffect(() => {
    fetchData(1)
      .then(result => {
        if (result.errors) {
          console.log('error', result.errors)
        } else {
          const apiData: SearchPhotosResponse = result.response;

          dispatch(
            setPhotosResponse({
              tag: "success",
              page: 1,
              photos: apiData.results,
              total: apiData.total,
              total_pages: apiData.total_pages
            })
          );
        }
      })
      .catch(() => dispatch(setPhotosResponse({ tag: "failure" })));
  }, []);

  console.log(data);
  switch (data.tag) {
    case "failure":
      return (
        <div className="bodyContainer">
          An error occured. Please try again later
        </div>
      );
    case "success": {
      return <Feed fetchData={fetchData} data={data} dispatch={dispatch} />;
    }
    case "initial":
      return (
        <div className="bodyContainer">
          <svg
            version="1.1"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="#767676"
          >
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
          </svg>
        </div>
      );
    case "loading":
      return <div className="bodyContainer loading">Loading results...</div>;
  }
};
export default Body;