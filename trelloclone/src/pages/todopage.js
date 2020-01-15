import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Input, Col, Button } from 'reactstrap';
import { serverApi } from '../components/api';

const Todopage = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [lists, setLists] = useState(null);
  const [listname, setListname] = useState(null);
  const [todo, setTodo] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [inputvalue, setInputvalue] = useState('');

  const addList = async e => {
    setListname(e.target.value);
    console.log('이름이요', e.target);
    if (e.target.value) {
      await serverApi.addList(token, e.target.value, match.params.boardid);
      preload();
    }
  };

  const addTodo = async e => {
    setTodo(e.target.value);
    console.log('이름이요', e.target.value);
    if (e.target.value) {
      await serverApi.addTodo(
        token,
        e.target.value,
        match.params.boardid,
        e.target.id
      );
      preload();
    }
  };

  const deleteTodo = async (todoid, listid) => {
    console.log('hihihsdf', todoid, listid);
    await serverApi.deleteTodo(token, todoid, listid, match.params.boardid);
    preload();
  };

  const deleteList = async listid => {
    console.log('리스트', listid);
    await serverApi.deleteList(token, listid, match.params.boardid);
    preload();
  };

  const modifyTodo = (todoid, listid, todo, index) => {
    const newListn = [...lists];
    console.log(index);
    console.log(newListn[index]);
    newListn[index]['todos'].map(todo => {
      if (todo.id === todoid) {
        todo.clicked = true;
      }
    });
    setInputvalue(todo);
    setLists(newListn);
  };

  const modifycompTodo = async (todoid, listid, index, event) => {
    const newListn = [...lists];
    console.log('들어옴', event);
    console.log(newListn[index]);
    newListn[index]['todos'].map(todo => {
      if (todo.id === todoid) {
        todo.clicked = false;
      }
    });

    setLists(newListn);

    if (inputvalue) {
      await serverApi.changeTodo(
        token,
        inputvalue,
        todoid,
        match.params.boardid,
        listid
      );
    }

    preload();
  };

  const changetodo = e => {
    setInputvalue(e.target.value);
  };

  const setup = e => {
    setInputvalue(e);
  };

  const preload = async () => {
    if (localStorage.getItem('token')) {
      const userToken = await localStorage.getItem('token');
      setToken(userToken);

      const userId = await localStorage.getItem('userId');
      const dataLists = await serverApi.getLists(
        userToken,
        match.params.boardid
      );

      console.log('hihihi', dataLists);
      setLists(dataLists.data);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      {lists ? (
        <div>
          {lists.map((list, index) => {
            return (
              <Col key={list.id}>
                <Button
                  onClick={() => {
                    deleteList(list.id);
                  }}
                >
                  리스트삭제
                </Button>
                <ListGroup key={list.id}>
                  {list.list_name}
                  {list.todos.map(toDo => {
                    return !toDo.clicked ? (
                      <ListGroupItem
                        key={toDo.id}
                        onClick={() => {
                          modifyTodo(toDo.id, list.id, toDo.todo, index);
                        }}
                      >
                        {toDo.todo}
                        <Button
                          onClick={() => {
                            deleteTodo(toDo.id, list.id);
                          }}
                        >
                          x
                        </Button>
                      </ListGroupItem>
                    ) : (
                      <>
                        <Input
                          key={toDo.id}
                          type="text"
                          name="todoname"
                          value={inputvalue}
                          onChange={changetodo}
                          onClick={() => {
                            setInputvalue(toDo.todo);
                          }}
                        />
                        <Button
                          id={'mod' + toDo.id}
                          onClick={() => {
                            modifycompTodo(toDo.id, list.id, index);
                          }}
                        >
                          수정
                        </Button>
                      </>
                    );
                  })}
                  <Input
                    key={list.id}
                    id={list.id}
                    type="text"
                    name="todoname"
                    placeholder="새로운 할일 생성"
                    onClick={addTodo}
                  />
                </ListGroup>
              </Col>
            );
          })}
          <Input
            type="text"
            id="makenewlist"
            name="listname"
            placeholder="새로운 리스트 생성"
            onClick={addList}
          />
        </div>
      ) : (
        <Input
          type="text"
          id="makenewlist"
          name="listname"
          placeholder="새로운 리스트 생성"
          onClick={addList}
        />
      )}
    </div>
  );
};

export default Todopage;
