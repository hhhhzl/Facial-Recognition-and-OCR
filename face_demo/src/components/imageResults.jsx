import React, { Component } from "react";
import { Accordion, Alert, Button, Card } from "react-bootstrap";
import RelatedImageDisplay from "./relatedImageDisplay";

export default class ImageResults extends Component {
  handleResultItem = (result, i) => {
    if (result.user_list.length === 0) return null;
    let bestMatch = result.user_list[0];
    let annotation = "相似度： " + bestMatch.score.toFixed(2) + "%";

    return (
      <Card key={"accitem" + i}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={i + 1}>
            {bestMatch.user_id}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={i + 1}>
          <Card.Body>
            <RelatedImageDisplay
              person={bestMatch.user_id}
              queryImage={this.props.queryImage}
              resAnnotation={annotation}
              faceLoc={result.location}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  render() {
    let faceList = this.props.results;
    let content = null;

    if (this.props.errorCode === 222207) {
      content = <Alert variant="warning">未在数据库中匹配到相似人物。</Alert>;
    } else if (this.props.errorCode > 0) {
      content = (
        <Alert variant="danger">
          运行出现错误！错误信息：{this.props.errorMsg}
        </Alert>
      );
    } else if (faceList == null) {
      content = <Alert variant="warning">未在数据库中匹配到相似人物。</Alert>;
    } else {
      let successAlert = (
        <Alert variant="success">在数据库中成功匹配到以下人物。</Alert>
      );
      content = (
        <React.Fragment>
          {faceList.length > 0 ? successAlert : null}
          <Accordion>{faceList.map(this.handleResultItem)}</Accordion>
        </React.Fragment>
      );
    }

    return content;
  }
}
