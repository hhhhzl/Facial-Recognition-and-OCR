import React, { Component } from "react";
import { Alert, Card } from "react-bootstrap";
import ImageResultCard from "./imageResultCard";

export default class ImageResults extends Component {
  handleResultItem = (result, i) => {
    console.log(result);
    return (
      <ImageResultCard
        imageURL={this.props.queryImage}
        location={result.location}
        annotation={result.words}
        key={"img-res-card" + i}
      />
    );
  };

  render() {
    let resultList = this.props.results;
    let content = null;

    if (this.props.errorCode > 0) {
      content = (
        <Alert variant="danger">
          运行出现错误！错误信息：{this.props.errorMsg}
        </Alert>
      );
    } else if (resultList === null) {
      content = null;
    } else if (resultList.length === 0) {
      content = <Alert variant="danger">未识别出文字。</Alert>;
    } else {
      let successAlert = <Alert variant="success">成功识别出以下文字。</Alert>;
      content = (
        <React.Fragment>
          {resultList.length > 0 ? successAlert : null}

          <div id="image-results-display-container">
            {resultList.map(this.handleResultItem)}
          </div>
        </React.Fragment>
      );
    }

    return (
      <Card>
        <Card.Header>
          <h5>
            <b>识别结果</b>
          </h5>
        </Card.Header>
        <Card.Body>{content}</Card.Body>
      </Card>
    );
  }
}
