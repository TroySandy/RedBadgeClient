import React from 'react'
import { Reducer } from "redux";
import { Photo } from "../helpers/requests";

export type PhotosState =
  | {
      tag: "failure" | "loading" | "initial";
    }
  | {
      tag: "success";
      total_pages: number;
      total: number;
      photos: Photo[];
      page: number;
    };

export const photosReducer: Reducer<PhotosState, Action> = (
  state = { tag: "initial" },
  action
) => {
  switch (action.type) {
    case "SET_PHOTOS_RESPONSE":
      return action.photosResponse;
    case "ADD_PHOTOS":
      if (state.tag === "success") {
        return {
          ...state,
          photos: [...state.photos, ...action.payload.photos],
          page: state.page + 1
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

// actions
export const setPhotosResponse = (photosResponse: PhotosState) => ({
  // adding `as const` allows the action types to flow correctly inside the reducer.
  type: "SET_PHOTOS_RESPONSE" as const,
  photosResponse
});

export const addPhotos = (payload: { photos: Photo[] }) => ({
  // adding `as const` allows the action types to flow correctly inside the reducer.
  type: "ADD_PHOTOS" as const,
  payload
});

type Action = ReturnType<typeof setPhotosResponse | typeof addPhotos>;
