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
import core from './../../core'
const openNotification = () => {
  const args = {
 
    message: "Notification ",
    description: "Successfully synced",
    placement: "bottomRight",
    duration: 2,
  };
  notification.info(args);
};
function VideoRow(props) {
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
        <Link to={`words?id=${user.name}`}>{user.name}</Link>
      </th>
      <td>
        <Link to={"words?id=" + user.name}>{user.name}</Link>
      </td>
      <td>{user.category}</td>
      <td>{user.size}</td>
    </tr>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  async prepareVideos() {
    let data = await core.getVideos();
    this.setState({ data });
  }
  sync = async () => {
    try {
      await api.importFromDir();

      let {
        data: { data },
      } = await api.getVideos();
      this.setState({ data });
      openNotification("bottomRight");
    } catch (error) {}
  };
  componentDidMount() {
    this.prepareVideos();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Videos{" "}
                <small className="text-muted"></small>
                <span onClick={this.sync} className="float-right">
                  <Button size="sm" color="warning">
                    Sync with directory
                  </Button>
                </span>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">category</th>
                      <th scope="col">size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((user, index) => (
                      <VideoRow key={index} user={user} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
