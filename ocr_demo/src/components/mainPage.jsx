import React, { Component } from "react";
import ImageResults from "./imageResults";
import ImageUpload from "./imageUpload";
import { ACCESS_TOKEN } from "../utils/keys";
import DEFAULT_IMG from "../assets/img/default.png";
import { img2Base64 } from "../utils/canvas";
import { DEFAULT_RESULTS } from "../assets/data/defaultResults";

const DEBUG = false;

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryImage: DEFAULT_IMG,
      displayImage: DEFAULT_IMG,
      results: null,
      errorCode: 0,
      errorMsg: "SUCCESS",
    };
  }

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
      "https://aip.baidubce.com/rest/2.0/ocr/v1/handwriting" +
      "?access_token=" +
      ACCESS_TOKEN;

    let bodyData = new FormData();
    bodyData.append("image", b64.substring(b64.indexOf("base64,") + 7)); // raw base64 value

    let requestOptions = {
      method: "POST",
      body: bodyData,
      redirect: "follow",
      //mode: "no-cors",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let res = result.words_result ? result.words_result : [];
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
    return (
      <div id="main-container">
        <section>
          <ImageUpload
            queryImage={this.state.queryImage}
            handleQueryImage={this.handleQueryImage}
          />
        </section>
        <section>
          <ImageResults
            queryImage={this.state.queryImage}
            results={this.state.results}
            errorCode={this.state.errorCode}
            errorMsg={this.state.errorMsg}
          />
        </section>
      </div>
    );
  }
}
