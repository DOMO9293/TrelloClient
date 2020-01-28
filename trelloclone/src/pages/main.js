import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardLink,
  Input,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  Badge,
  CardColumns,
  CardHeader
} from 'reactstrap';
import { serverApi } from '../components/api';
import Login from './login';
import {
  withRouter,
  Redirect,
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Mainpage = () => {
  const [loggedin, setLoggedin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);
  const [token, setToken] = useState(null);
  const [boardname, setBoardname] = useState(null);
  const [newboardname, setNewboardname] = useState('');

  const addboard = async e => {
    console.log('이름이요', e.key);
    if (e.target.value && e.key === 'Enter') {
      await serverApi.addBoard(token, e.target.value);
      setNewboardname('');
      preload();
    }
  };

  const setValue = e => {
    setNewboardname(e.target.value);
  };

  const preload = async () => {
    if (localStorage.getItem('token')) {
      setLoggedin(true);
      const userToken = await localStorage.getItem('token');
      console.log(userToken);
      setToken(userToken);

      const dataBoards = await serverApi.getBoards(userToken);

      console.log('hihihi', dataBoards);
      setBoards(dataBoards.data);
    } else {
      setLoggedin(false);
    }
  };

  const logout = async () => {
    console.log(token);
    await localStorage.removeItem('token');
    preload();
  };

  const deleteBoard = async boardid => {
    console.log('보드', boardid);
    await serverApi.deleteBoard(token, boardid);
    preload();
  };

  const nextpage = boardid => {
    //serverApi.getLists(token, index);
    return <Link to={`${boardid}/list`} />;
  };

  useEffect(() => {
    preload();
  }, []);

  return loggedin ? (
    <div>
      {boards && (
        <Row style={{ marginTop: 10 }}>
          <CardColumns>
            {boards.map(data => {
              return (
                <Card
                  style={{ height: 100, width: 200 }}
                  body
                  inverse
                  color="info"
                  key={data.id}
                  onClick={() => {
                    console.log('clicked');
                    nextpage(data.id);
                  }}
                >
                  <Row style={{ marginTop: -20 }}>
                    <Button
                      close
                      onClick={() => {
                        deleteBoard(data.id);
                      }}
                      style={{ color: 'black', marginLeft: 170 }}
                    />
                  </Row>
                  <Row style={{ marginTop: 45 }}>
                    <CardLink
                      href={`${data.id}/list`}
                      style={{ color: 'black', marginLeft: 3 }}
                    >
                      {data.board_name}
                    </CardLink>
                  </Row>
                </Card>
              );
            })}
            <Card body color="info" style={{ width: 200, height: 100 }}>
              <Input
                style={{ marginTop: 30 }}
                type="text"
                id="makenewboard"
                name="boardname"
                placeholder="+ 새로운 보드 생성"
                value={newboardname}
                onKeyPress={addboard}
                onChange={setValue}
              />
            </Card>
          </CardColumns>
        </Row>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Mainpage;
