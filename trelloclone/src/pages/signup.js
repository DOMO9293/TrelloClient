import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap';
import { serverApi } from '../components/api';
import { Link, Redirect } from 'react-router-dom';

const Signup = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [alerton, setAlerton] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  const preload = async () => {
    console.log('isit', clicked);
    if (localStorage.getItem('token')) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };
  useEffect(() => {
    preload();
  }, []);

  const onDismiss = () => setAlerton(false);

  const getresult = () => {
    if (value1 && value2 && value3) {
      serverApi.signUp(value1, value2, value3).then(data => {
        console.log(data);
        if (data.data === 'email already exists!') {
          console.log('imin');
          setAlerton(true);
        } else {
          setclicked(!clicked);
        }

        //preload();
      });
    }
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
  return !loggedin || !clicked ? (
    <div>
      <Alert color="info" isOpen={alerton} toggle={onDismiss}>
        회원가입에 실패했습니다
      </Alert>
      <Modal isOpen={clicked} toggle={toggle}>
        <ModalBody>회원가입이 완료되었습니다.</ModalBody>
        <ModalFooter>
          <Button href="/">돌아가기</Button>
        </ModalFooter>
      </Modal>
      <Container style={{ marginLeft: 100 }}>
        <Row style={{ width: 400, margin: 30, marginLeft: 150 }}>
          <h1 style={{ textAlign: 'justify' }}>회원가입</h1>
        </Row>
        <Row style={{ width: 400, margin: 30 }}>
          <Input
            type="email"
            id="makenewboard"
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
            marginLeft: 110
          }}
        >
          <Button
            content="Click Here"
            style={{ margin: 20 }}
            onClick={getresult}
          >
            회원가입
          </Button>
          <Button content="Click Here" style={{ margin: 20 }} href="/">
            돌아가기
          </Button>
        </Row>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Signup;
