import React from "react";
import { createApi } from "unsplash-js";

export type Photo = {
  id: string;
  width: number;
  height: number;
  urls: { full: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

export type SearchPhotosResponse = {
  total_pages: number;
  total: number;
  results: Photo[];
};

// set your access token here
const ACCESS_TOKEN = "QrZ_4CjnXpZU7ZOT1EJBrOjpWbgZyRvfZQ6QfutowmE";
const api = createApi({ accessKey: ACCESS_TOKEN });

export const getSearchPhotos = (query: string, page = 1) =>
  api.search.getPhotos({ query, page, perPage: 10 });
