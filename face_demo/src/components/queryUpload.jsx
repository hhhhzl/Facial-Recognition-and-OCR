import React, { Component } from "react";
import { Card, Form, Image } from "react-bootstrap";
import { DB_DATA } from "../assets/data/mockdb";

export default class QueryUpload extends Component {
  state = {
    queryMethod: this.props.queryMethod,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.queryMethod !== this.props.queryMethod) {
      this.setState({ queryMethod: this.props.queryMethod });
    }
  }

  handleImage() {
    return (
      <React.Fragment>
        <div id="query-upload-display">
          <Image src={this.props.queryImage} thumbnail />
        </div>

        <Form onChange={this.props.handleQueryImage}>
          <Form.File id="query-upload-form" label="上传本地图片" custom />
        </Form>
      </React.Fragment>
    );
  }

  handleName() {
    return (
      <React.Fragment>
        <Form>
          <Form.Control
            as="select"
            defaultValue=""
            onChange={this.props.handleQueryName}
          >
            <option value="" disabled>
              选择人名
            </option>
            {Object.keys(DB_DATA).map((k) => (
              <option value={k} key={"name-option-" + k}>
                {k}
              </option>
            ))}
          </Form.Control>
        </Form>
      </React.Fragment>
    );
  }

  render() {
    let inputSection =
      this.state.queryMethod === "image"
        ? this.handleImage()
        : this.handleName();

    return (
      <Card id="query-upload-card">
        <Card.Header>
          <h5>
            <b>搜索</b>
          </h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Control
              as="select"
              defaultValue="image"
              onChange={this.props.handleQueryMethod}
            >
              <option value="image">搜索图片</option>
              <option value="name">搜索人名</option>
            </Form.Control>
          </Form>
          <br />

          {inputSection}
        </Card.Body>
      </Card>
    );
  }
}
