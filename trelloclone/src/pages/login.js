import React, { useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
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
      localStorage.setItem('token', data.data.token);
      preload();
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
      <Input
        type="email"
        id="makenewboard"
        name="boardname"
        placeholder="이메일"
        value={value1}
        onChange={changevalue1}
      />
      <Input
        type="password"
        id="makenewboard"
        name="boardname"
        placeholder="비밀번호"
        value={value2}
        onChange={changevalue2}
      />
      <Button content="Click Here" onClick={getresult}>
        로그인
      </Button>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
