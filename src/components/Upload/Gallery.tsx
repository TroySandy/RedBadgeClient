import React from "react";
import UserContext from "../../UserContext/UserContext";
const user_context = UserContext;

export default class Gallery extends React.Component<{}, {}> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("http://localhost:4000/media/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Files not found", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  }
  render() {
    return <></>;
  }
}
