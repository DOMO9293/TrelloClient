import React, { useState, useEffect } from 'react';
import { Input, Button, Container, Row, Col } from 'reactstrap';
import { serverApi } from '../components/api';
import { Link, Redirect } from 'react-router-dom';

const Login = () => {
  const [loggedin, setLoggedin] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const preload = async () => {
    if (localStorage.getItem('token')) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };
  useEffect(() => {
    preload();
  }, []);

  const getresult = () => {
    console.log('hkhk');
    serverApi.logIn(value1, value2).then(data => {
      console.log('hkhk', data);
      if (data.data !== 'login failed') {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userId', data.data.userId);
        preload();
      } else {
        console.log('error');
      }
    });
  };

  const changevalue1 = e => {
    setValue1(e.target.value);
  };
  const changevalue2 = e => {
    setValue2(e.target.value);
  };
  return !loggedin ? (
    <div>
      <Container style={{ marginLeft: 100 }}>
        <Row style={{ width: 400, margin: 30, marginLeft: 170 }}>
          <h1 style={{ textAlign: 'justify' }}>로그인</h1>
        </Row>
        <Row style={{ width: 400, margin: 30 }}>
          <Input
            type="email"
            id="makenewboard1"
            name="boardname"
            placeholder="이메일"
            value={value1}
            onChange={changevalue1}
          />
        </Row>
        <Row style={{ width: 400, margin: 30 }}>
          <Input
            type="password"
            id="makenewboard"
            name="boardname"
            placeholder="비밀번호"
            value={value2}
            onChange={changevalue2}
          />
        </Row>
        <Row
          style={{
            width: 400,
            margin: 30,
            alignContent: 'center',
            marginLeft: 120
          }}
        >
          <Button
            content="Click Here"
            onClick={getresult}
            style={{ margin: 20 }}
          >
            로그인
          </Button>
          <Button href="/signup" style={{ margin: 20 }}>
            회원가입
          </Button>
        </Row>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
