import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import PostCreate from "./pages/user/Create";
import Home from "./pages/user/User";
import Header from "./components/Header";
function App() {
  return (
    <main>
      <Header />
      <Container>
        <Row>
          <Col>
            <Router>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={PostCreate} />
              <Route exact path="/edit/:id" component={PostCreate} />
            </Router>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
