import React, { Component } from "react";
import { Container, Table, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import UserService from "./services/UserService";
import { alertDanger, verificationAlert } from "../../utils/alerts";
import { convertDateToBr } from "../../utils/masks";
export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }
  componentDidMount() {
    this.getAll();
  }
  getAll = async () => {
    try {
      const response = await UserService.list();
      this.setState({ data: response });
    } catch (error) {
      alertDanger(error);
    }
  };
  deleteItem = ({ id, name }) => {
    verificationAlert({ id, message: `Are you sure you want to delete the ${name} user?`, nameModule: "user" }, this.deleteItemCallback);
  };
  deleteItemCallback = async (id) => {
    try {
      await UserService.remove(id);
      await this.getAll();
    } catch (error) {
      throw error;
    }
  };
  render() {
    const { data } = this.state;
    return (
      <Container fluid className="mt-2">
        <Link to={`/add`} className="btn btn-primary float-right">
          Add to list
        </Link>
        <Table bordered hover responsive size="sm" className="mt-2">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Name</th>
              <th className="text-center">LastName</th>
              <th className="text-center">Date of birth</th>
              <th className="text-center" >Check</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.lastName}</td>
                <td className="text-center"> {convertDateToBr(user.date)}</td>
                <td className="text-center">
                  {user.check ? (
                    <Badge href="#" color="success">
                      <i className="fas fa-check-circle fa-2x"></i>
                    </Badge>
                  ) : (
                    <Badge href="#" color="danger">
                      <i className="fas fa-times-circle fa-2x"></i>
                    </Badge>
                  )}
                </td>
                <td className="text-center">
                  <Link className="btn btn-success btn-sm mr-3" size="sm" to={`edit/${user.id}`}>
                    <i className="fas fa-pen"></i>
                  </Link>
                  <Button color="danger" size="sm" onClick={() => this.deleteItem(user)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
