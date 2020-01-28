import React, { useState, useEffect } from 'react';
import {
  Input,
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { serverApi } from '../components/api';
import { Link, Redirect } from 'react-router-dom';

const Mypage = () => {
  const [loggedin, setLoggedin] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [clicked, setclicked] = useState(false);

  const [token, setToken] = useState(null);
  const isCancelled = React.useRef(false);

  const logout = async () => {
    console.log(token);
    try {
      await localStorage.removeItem('token');
      preload();
    } catch (e) {
      console.log(e);
    }
  };

  const preload = async () => {
    try {
      if (!isCancelled.current) {
        if (localStorage.getItem('token')) {
          setLoggedin(true);
          const userToken = await localStorage.getItem('token');
          const userId = await localStorage.getItem('userId');
          console.log(userToken);
          setToken(userToken);

          const datausers = await serverApi.getUser(userToken, userId);

          setValue1(datausers.data.email);
          setValue3(datausers.data.userName);

          console.log('ciomein', datausers);
        } else {
          setLoggedin(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preload();
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const getresult = () => {
    serverApi.changeUser(token, value2, value3).then(data => {
      console.log('hi', data);
      setclicked(!clicked);

      preload();
    });
  };
  const toggle = () => {
    setclicked(!clicked);
  };

  const changevalue1 = e => {
    setValue1(e.target.value);
  };
  const changevalue2 = e => {
    setValue2(e.target.value);
  };
  const changevalue3 = e => {
    setValue3(e.target.value);
  };
  return !clicked ? (
    <div>
      {' '}
      <Modal isOpen={clicked} toggle={toggle}>
        <ModalBody>저장이 완료되었습니다.</ModalBody>
        <ModalFooter>
          <Button href="/">돌아가기</Button>
        </ModalFooter>
      </Modal>
      <Container style={{ marginLeft: 100 }}>
        <Row style={{ width: 400, margin: 30, marginLeft: 150 }}>
          <h1 style={{ textAlign: 'justify' }}>회원정보</h1>
        </Row>
        <Row style={{ width: 400, margin: 30 }}>
          <Input
            type="email"
            id="makenewboard"
            name="boardname"
            placeholder="이메일"
            value={value1}
            readOnly
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
        <Row style={{ width: 400, margin: 30 }}>
          <Input
            type="text"
            id="makenewboard"
            name="boardname"
            placeholder="이름"
            value={value3}
            onChange={changevalue3}
          />
        </Row>
        <Row
          style={{
            width: 400,
            margin: 30,
            alignContent: 'center',
            marginLeft: 140
          }}
        >
          <Button
            content="Click Here"
            onClick={getresult}
            style={{ marginRight: 10 }}
          >
            저장하기
          </Button>
          <Button href="/" onClick={logout}>
            로그아웃
          </Button>
        </Row>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Mypage;
