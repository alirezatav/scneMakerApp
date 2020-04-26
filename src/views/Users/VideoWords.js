import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import core from './../../core'
import api from './../../api'
import usersData from "./UsersData";
import { notification } from "antd";
import QueryString from "query-string";
const openNotification = (d) => {
  const args = {
    message: "Notification ",
    description: "Export is being processed",
    placement: "bottomRight",
    duration: 2,
  };
  if (d.data.message) {
    args.description = d.data.message;
  }
  notification.info(args);
};
function WordRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  const getBadge = (status) => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr>
      <th scope="row">{user.name}</th>{" "}
      <td>
        <Link to={`scenes?id=${user.name}&word=${user.word}`}>
          <b />
          {user.word}
          <b />
        </Link>
      </td>
      <td>
        {" "}
        <Link to={`scenes?id=${user.name}&word=${user.word}`}>{user.name}</Link>
      </td>
      <td>{user.count}</td>
    </tr>
  );
}

class VideoWords extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, data: [], word: "", details: {} };
  }
  async prepareVideos(id) {
   
    try {
      let data = await core.getVideoWords(id);
      console.log(44,data)

      this.setState({ data, id });
    } catch (error) {
      console.log("error");
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  makeScene = async () => {
    try {
      var data = await api.makeScene({
        video_id: this.state.id,
        word: this.state.word,
      });

      this.prepareVideos(this.state.id);
    } catch (error) {
      console.log("error");
    }
    this.setState({ modal: false, word: "" });
    openNotification(data);
  };
  getDetail = async (id) => {
    api.getVideoDetail(id).then((d) => {
      this.setState({ details: d.data.data });
    });
  };
  componentDidMount() {
    const id = QueryString.parse(this.props.location.search).id;
    if (id) {
      this.getDetail(id);
      this.prepareVideos(id);
    } else {
      alert("id not found");
    }
  }
  render() {
    const userList = usersData.filter((user) => user.id < 10);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Words
                <b>{` ${this.state.details.name}`}</b>
                <small className="text-muted"></small>
                <span onClick={this.toggle} className="float-right">
                  <Button size="sm" color="success">
                    {" "}
                    Add Word
                  </Button>
                </span>
                <span
                  onClick={() => this.prepareVideos(this.state.id)}
                  className="float-right mr-2"
                >
                  <Button size="sm" color="warning">
                    {" "}
                    Refresh
                  </Button>
                </span>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Video ID</th>
                      <th scope="col">Word</th>
                      <th scope="col">Video</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((user, index) => (
                      <WordRow key={index} user={user} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>{" "}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={true}
          className={this.props.className + " text-center"}
        >
          <ModalHeader toggle={this.toggle}>Add Word </ModalHeader>
          <ModalBody>
            Make scenes for this video with this word
            <Col xs="12" className="mt-2">
              <FormGroup>
                <Input
                  onChange={({ target: { value } }) =>
                    this.setState({ word: value })
                  }
                  type="text"
                  id="word"
                  placeholder="Enter  word"
                />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.makeScene}>
              Make
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default VideoWords;
