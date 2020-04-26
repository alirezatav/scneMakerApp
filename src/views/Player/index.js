import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import api from "./../../api/";
import { notification } from "antd";
import QueryString from "query-string";
import { getVideo } from "./../../core";
import c from '../../config'
 
class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: require("../../" + c.videosDirectory + "/"+QueryString.parse(this.props.location.search).path)
    };
  }


  render() {

    return (
      <div className="animated fadeIn p-3">
     
        <video style={{ width: "100%", height: "100%" }} controls autoplay>
          <source src={this.state.src} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default VideoPlayer;
