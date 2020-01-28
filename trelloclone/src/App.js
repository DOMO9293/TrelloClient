import React from 'react';
import {
  withRouter,
  Link,
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  NavItem,
  Navbar,
  Collapse,
  NavbarBrand,
  Nav,
  NavLink,
  Button
} from 'reactstrap';
import {
  faHome,
  faEllipsisH,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull,
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mainpage from './pages/main';
import Login from './pages/login';
import Todopage from './pages/todopage.js';
import Mypage from './pages/mypage.js';
import Signup from './pages/signup.js';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: '#ff9800', height: 1060 }}>
      <Router>
        <Navbar style={{ opacity: 0.7, backgroundColor: '#333' }}>
          <NavbarBrand href="/" style={{ alignSelf: 'center', color: 'white' }}>
            <FontAwesomeIcon icon={faHome} />
          </NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink href="/mypage" style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Container className="App">
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/todo" component={Todopage} />
            <Route exact path="/:boardid/list" component={Todopage} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/signup" component={Signup} />
            <Redirect path="/else" to="todo" />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default withRouter(App);
