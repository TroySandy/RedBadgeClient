import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import config from "../../config";
// import UserContext from "../../UserContext/UserContext";
// const userContext = UserContext

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export interface IState {
  media: any;
  title: any;
  private: boolean;
  userId: string;
}

export interface IProps {}

class FileUpload extends React.Component<IProps, IState> {
  // static contextType = UserContext;
  constructor(props: IProps) {
    super(props);
    this.state = {
      media: [],
      title: '',
      private: false,
      userId: "",
    };
  }

  handleInit = () => {
    console.log("FilePond instance has initialised");
  };
  handleFileInit = () => {
    console.log("FilePond File instance has initialised");
  };
  handleFileStart = () => {
    console.log("FilePond File loading has initialised");
  };

  postPicture = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    fetch(`http://localhost:3000/media/`, {
      method: "POST",
      body: JSON.stringify({
        media: this.state.media,
        title: this.state.title.toString(),
        private: this.state.private,
        userId: 'd5fa8de1-a62d-444a-9555-bbc92860495f'
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1ZmE4ZGUxLWE2MmQtNDQ0YS05NTU1LWJiYzkyODYwNDk1ZiIsImlhdCI6MTYyMTAxMjUyNn0.Mm_mxq7U6dkoVuh6MA8Ium003IoY5COA-X9jaZbtBAo
        `,
      }),
    })
      .then((res) => res.json())
      .then((mediaData) => {
        console.log(mediaData);

        // this.setState = {
        //   media: [],
        //   title: [],
        //   private: false,

        // }
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <div className="App">
        <form >
          <FilePond
            files={this.state.media}
            allowMultiple={false}
            // allowReorder={true}
            // maxFiles={3}
            server={'http://localhost:3000/media'}
            name="media"
            oninit={() => this.handleInit}
            // header= 
            onupdatefiles={(mediaItems) => {
              // Set currently active file objects to this.state
              this.setState({
                media: mediaItems.map((mediaItem) => mediaItem.file),
                title: mediaItems.map((mediaItem) => mediaItem.file.name),
              });
                console.log(this.state.media, this.state.title);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
