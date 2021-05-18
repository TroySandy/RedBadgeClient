export interface IResponse {
  docs: [];
}

interface IHeadline {
  main: string;
}

export interface IUnsplash {
  alt_description: string;
  blurhash: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    download: string;
    download_locations: string;
    html: string;
    self: string;
  };
  user: {
    bios: string;
    name: string;
    artist_image: string;
    portfolio_url: string;
    links: {
      photos: string;
      portfolio: string;
      self: string;
    };
    location: string;
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
  };
  private: boolean;
}

export interface IResults {
  response: IResponse;
}

export interface IState {
  query?: string;
  startDate?: string;
  endDate?: string;
  response?: IResults;
  pageNumber: number;
}

export interface IValue {
  value: string;
  name: string;
}
