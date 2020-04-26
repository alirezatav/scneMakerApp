import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import api from "./../../api/";
import { notification } from "antd";
import { base_url } from "./../../api/";

const openNotification = (error) => {
  const args = {
    message: "Error ",
    description: "Send one .srt file a Video file ",
    placement: "bottomRight",
    duration: 2,
  };
  if (error) {
    args.description = error.message;
  }

  notification.info(args);
};

class UploadVideo extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], name: "", cat: "", uploading: false };
  }
  inputChanges = (e) => {
    if (e.target.type !== "file")
      this.setState({ [e.target.name]: e.target.value });
  };
  submitForm = async () => {
    var formData = new FormData();
    if (
      this.state.name === "" ||
      this.state.cat === "" ||
      !document.getElementById("upload-s").files[0] ||
      !document.getElementById("upload-v").files[0]
    ) {
      openNotification();
      return;
    } else {
      formData.append("name", this.state.name);
      formData.append("category", this.state.cat);
      formData.append("video", document.getElementById("upload-v").files[0]);
      formData.append("subtitle", document.getElementById("upload-s").files[0]);
      this.setState({ uploading: true });
      try {
        await api.uploadVideo(formData);
        window.location.href = "./";
      } catch (error) {
        this.setState({ uploading: false });
        openNotification(error);
      }
    }
  };
  componentDidMount() {}
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong>Create Video </strong> / upload
              </CardHeader>
              <CardBody>
                <Form
                  action={base_url + "/upload-video"}
                  method="post"
                  id="upload-video"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Video Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={(e) => {
                          this.setState({
                            name: e.target.value.replace(/\s/g, "."),
                          });
                        }}
                        value={this.state.name}
                        type="text"
                        name="name"
                      />
                      <FormText color="muted">
                        This is a name for video
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="cat">Category</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.inputChanges}
                        type="text"
                        name="cat"
                        value={this.state.cat}
                      />
                      <FormText color="muted">Type a category</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Video and Subtitle files
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="upload-v" multiple />
                      <FormText color="muted">Select a video file. </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Subtitle files</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="upload-s" multiple />
                      <FormText color="muted">Select (.srt)</FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={this.submitForm}
                  type="submit"
                  size="sm"
                  color="primary"
                >
                  <i className="fa fa-dot-circle-o"></i>{" "}
                  {this.state.uploading ? "Uploading ..." : "Upload"}
                </Button>
                <Button type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UploadVideo;
