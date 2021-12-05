import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { imageCrop } from "../utils/canvas";

export default class ImageResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alteredURL: null,
    };
  }

  updateCroppedURL = () => {
    const { imageURL, location } = this.props;
    imageCrop(
      imageURL,
      location.left,
      location.top,
      location.width,
      location.height
    ).then((url) => {
      this.setState({ alteredURL: url });
    });
  };

  // draw upon handling the first query
  componentDidMount() {
    if (this.props.location && !this.state.alteredURL) this.updateCroppedURL();
  }

  // draw upon handling the remaining queries
  componentDidUpdate(prevProps) {
    if (prevProps.imageURL !== this.props.imageURL) {
      if (this.props.location) {
        this.updateCroppedURL();
      } else {
        this.setState({ alteredURL: null });
      }
    }
  }

  render() {
    let renderURL = this.state.alteredURL
      ? this.state.alteredURL
      : this.props.imageURL;
    return (
      <div className="image-result-item-container">
        <Card>
          <Card.Img src={renderURL} />
          <Card.Body>
            <Card.Text>{this.props.annotation}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
