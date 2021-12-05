import React, { Component } from "react";
import { DB_DATA, DB_PATH } from "../assets/data/mockdb";
import ImageResultCard from "./imageResultCard";
import { Alert } from "react-bootstrap";

export default class NameResults extends Component {
  state = {
    person: this.props.queryPerson,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.queryPerson !== this.props.queryPerson) {
      this.setState({ person: this.props.queryPerson });
    }
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

  render() {
    if (!this.state.person) return null;
    let rImg = DB_DATA[this.state.person];
    let alert = null;
    if (!rImg) {
      rImg = [];
      alert = <Alert variant="warning">未在数据库中找到该人物。</Alert>;
    } else {
      alert = <Alert variant="success">在数据库中成功找到以下图片。</Alert>;
    }

    return (
      <div>
        {alert}
        <div className="related-image-display">
          {rImg.map(this.handleRelatedImageItem)}
        </div>
      </div>
    );
  }
}
