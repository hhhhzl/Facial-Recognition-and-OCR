import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default class ImageUpload extends Component {
  render() {
    return (
      <Card id="image-upload-card">
        <Card.Header>
          <h5>
            <b>上传图片</b>
          </h5>
        </Card.Header>
        <Card.Body>
          <div id="image-upload-display">
            <Image src={this.props.queryImage} thumbnail />
          </div>

          <Form onChange={this.props.handleQueryImage}>
            <Form.File id="query-upload-form" label="本地图片" custom />
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
