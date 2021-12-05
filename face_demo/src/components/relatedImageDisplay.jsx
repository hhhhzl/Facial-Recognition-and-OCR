import React, { Component } from "react";
import { DB_DATA, DB_PATH } from "../assets/data/mockdb";
import ImageResultCard from "./imageResultCard";

export default class RelatedImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      faceLoc: this.props.faceLoc,
      relatedImages: DB_DATA[this.props.person],
    };
  }

  handleRelatedImageItem = (item, i) => {
    let annotation = "相似度：" + item.score.toFixed(2) + "%";
    return (
      <ImageResultCard
        imageURL={DB_PATH + item.path}
        location={item.location}
        annotation={annotation}
        key={"imgres-card" + i}
      />
    );
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.person !== this.props.person &&
      prevProps.faceLoc !== this.props.faceLoc
    ) {
      this.setState({
        person: this.props.person,
        faceLoc: this.props.faceLoc,
        relatedImages: DB_DATA[this.props.person],
      });
    }
  }

  render() {
    if (!this.props.person) return null;
    let rImg = this.state.relatedImages ? this.state.relatedImages : [];
    return (
      <div>
        <b>人脸位置</b>
        <div className="related-image-display">
          <ImageResultCard
            imageURL={this.props.queryImage}
            location={this.props.faceLoc}
            annotation={this.props.resAnnotation}
          />
        </div>
        <hr />

        <b>相关图片</b>
        <div className="related-image-display">
          {rImg.map(this.handleRelatedImageItem)}
        </div>
      </div>
    );
  }
}
