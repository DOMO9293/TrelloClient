import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardLink,
  Input
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

  const addboard = async e => {
    setBoardname(e.target.value);
    console.log('이름이요', boardname);
    if (e.target.value) {
      await serverApi.addBoard(token, e.target.value);
      preload();
    }
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
      <Button onClick={logout}>로그아웃</Button>
      {boards && (
        <div>
          {boards.map(data => {
            return (
              <Card
                key={data.id}
                onClick={() => {
                  console.log('clicked');
                  nextpage(data.id);
                }}
              >
                <CardLink href={`${data.id}/list`}>{data.board_name}</CardLink>
                <CardSubtitle>{data.createdAt.slice(0, 10)}</CardSubtitle>
                <Button
                  onClick={() => {
                    deleteBoard(data.id);
                  }}
                >
                  보드삭제
                </Button>
              </Card>
            );
          })}
          <Input
            type="text"
            id="makenewboard"
            name="boardname"
            placeholder="새로운 보드 생성"
            onClick={addboard}
          />
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Mainpage;
