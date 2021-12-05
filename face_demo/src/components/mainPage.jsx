import React, { Component } from "react";
import ImageResults from "./imageResults";
import NameResults from "./nameResults";
import QueryUpload from "./queryUpload";
import { ACCESS_TOKEN } from "../utils/keys";
import DEFAULT_FACE from "../assets/img/defaultFace.jpeg";
import { img2Base64 } from "../utils/canvas";
import { DEFAULT_RESULTS } from "../assets/data/defaultResults";
import { Card } from "react-bootstrap";

const DEBUG = false;

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryMethod: "image",
      queryImage: DEFAULT_FACE,
      displayImage: DEFAULT_FACE,
      queryPerson: null,
      results: [],
      errorCode: 0,
      errorMsg: "SUCCESS",
    };
  }

  handleQueryMethod = (event) => {
    if (event.target && event.target.value) {
      this.setState({
        queryMethod: event.target.value,
        queryImage: DEFAULT_FACE,
        displayImage: DEFAULT_FACE,
        queryPerson: null,
        results: [],
        errorCode: 0,
        errorMsg: "SUCCESS",
      });
    }
  };

  handleQueryName = (event) => {
    if (event.target.value) {
      this.setState({
        queryPerson: event.target.value,
      });
    }
  };

  handleQueryImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imgURL = URL.createObjectURL(event.target.files[0]);

      if (DEBUG) {
        this.setState({
          queryImage: imgURL,
          displayImage: imgURL,
          results: DEFAULT_RESULTS,
        });
      }

      img2Base64(imgURL).then((b64) => this.getImageResults(b64));
    }
  };

  getImageResults = (b64) => {
    if (DEBUG) return DEFAULT_RESULTS;

    let url =
      "https://aip.baidubce.com/rest/2.0/face/v3/multi-search" +
      "?access_token=" +
      ACCESS_TOKEN;

    let bodyData = new FormData();
    bodyData.append("image", b64.substring(b64.indexOf("base64,") + 7)); // raw base64 value
    bodyData.append("image_type", "BASE64");
    bodyData.append("group_id_list", "leaders");
    bodyData.append("max_face_num", "10");

    let requestOptions = {
      method: "POST",
      body: bodyData,
      redirect: "follow",
      //mode: "no-cors",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error_code > 0) console.log(result);
        let res = result.result ? result.result.face_list : [];
        this.setState({
          queryImage: b64,
          displayImage: b64,
          results: res,
          errorCode: result.error_code,
          errorMsg: result.error_msg,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          queryImage: b64,
          displayImage: b64,
          results: [],
          errorCode: 1,
          errorMsg: error.message,
        });
      });
  };

  render() {
    let resultSection =
      this.state.queryMethod === "image" ? (
        <ImageResults
          queryImage={this.state.queryImage}
          results={this.state.results}
          errorCode={this.state.errorCode}
          errorMsg={this.state.errorMsg}
        />
      ) : (
        <NameResults queryPerson={this.state.queryPerson} />
      );

    return (
      <div id="main-container">
        <section>
          <QueryUpload
            queryMethod={this.state.queryMethod}
            queryImage={this.state.queryImage}
            handleQueryImage={this.handleQueryImage}
            handleQueryName={this.handleQueryName}
            handleQueryMethod={this.handleQueryMethod}
          />
        </section>
        <section>
          <Card>
            <Card.Header>
              <h5>
                <b>结果</b>
              </h5>
            </Card.Header>
            <Card.Body>{resultSection}</Card.Body>
          </Card>
        </section>
      </div>
    );
  }
}
