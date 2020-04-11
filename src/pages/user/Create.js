import React, { Component } from "react";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { alertSuccess, alertDanger } from "../../utils/alerts";
import UserService from "./services/UserService";
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.idRoute = props.match.params.id || null;
    this.state = {
      user: { id: "", name: "", lastName: "", date: "", check: false },
    };
  }
  async componentDidMount() {
    if (this.idRoute) {
      await this.getById()
        .then((result) => {
          this.setInformations(result);
        })
        .catch((error) => {
          alertDanger(error);
        });
    }
  }
  getById = async () => {
    try {
      const response = await UserService.show(this.idRoute);
      return response;
    } catch (error) {
      return error;
    }
  };
  setInformations = (result) => {
    this.setState({ user: result });
  };
  onChange = ({ target }) => {
    const { user } = this.state;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ user: { ...user, [target.name]: value } });
  };
  createOrUpdate = async (user) => {
    if (this.idRoute) {
      await UserService.update(user)
        .then((result) => {
          alertSuccess("User successfully modified");
        })
        .catch((err) => {
          alertDanger(err);
        });
    } else {
      await UserService.create(user)
        .then((result) => {
          alertSuccess("User successfully created");
        })
        .catch((err) => {
          alertDanger(err);
        });
    }
  };
  handleStore = async (e) => {
    const { user } = this.state;
    await this.createOrUpdate(user);
    this.props.history.push("/");
  };
  render() {
    let { user } = this.state;
    return (
      <div>
        <h2>New Item</h2>
        <Form>
          <FormGroup>
            <Label for="name">Name: </Label>
            <Input type="text" value={user.name} onChange={this.onChange} name="name" id="name" placeholder="Insert item name here" />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">LastName: </Label>
            <Input type="text" value={user.lastName} onChange={this.onChange} name="lastName" id="lastName" placeholder="Insert item lastName here" />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date of birth: </Label>
            <Input type="date" value={user.date} onChange={this.onChange} name="date" id="date" placeholder="Insert item date here" />
          </FormGroup>
          <FormGroup check>
            <Label check></Label>
            <Input type="checkbox" name="check" onChange={this.onChange} id="check" check={user.check.toString()} /> Done?
          </FormGroup>
          <FormGroup className="mt-3">
            <Button color="primary" className="mr-3" onClick={this.handleStore}>
              Add
            </Button>
            <Link to="/" className="btn btn-secondary">
              Back To list
            </Link>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
