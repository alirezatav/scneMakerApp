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
  ModalHeader,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import core from './../../core'
import QueryString from "query-string";
function SceneRow(props) {
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
    <tr >
      <th scope="row">
        <Link to={user.link}>{user.id}</Link>
      </th>
      <td>
        <Link to={`/player?path=${user.name}/scenes/${user.word}/${user.video}`}>
          {user.video}
        </Link> 
      </td>
      <td>
        <a target="_blank" href={user.subtitle_link}>
          {/* {user.subtitle_path.split("/").pop()} */}
        </a>
      </td>
      <td>{user.word}</td>
      <td>
        {/* {new Date(
          new Date(null).setSeconds((user.end_time - +user.start_time) / 1000)
        )
          .toISOString()
          .substr(11, 8)}{" "} */}
      </td>
      <td>
        <Button disabled>download</Button>
      </td>
    </tr>
  );
}

class VideoWordScenes extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, data: [] };
  }
  prepareVideos = async (id, word) => {
    try {
      let data = await core.getVideoWordScenes(id, word);
      console.log(66,data)

      this.setState({ data, id, word });
    } catch (error) {
      console.log("error");
    }
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
 
    const id = QueryString.parse(this.props.location.search).id;
    const word = QueryString.parse(this.props.location.search).word;
    this.prepareVideos(id, word);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Scenes{" "}
                <small className="text-muted"></small>
                <span
                  onClick={() =>
                    this.prepareVideos(this.state.id, this.state.word)
                  }
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
                      <th scope="col">id</th>
                      <th scope="col">scene video </th>
                      <th scope="col">scene subtitle </th>
                      <th scope="col">word</th>
                      <th scope="col">time</th>
                      <th scope="col"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((user, index) => (
                      <SceneRow key={index} user={user} />
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
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
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

export default VideoWordScenes;
