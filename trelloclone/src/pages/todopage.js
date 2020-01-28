import React, { useState, useEffect } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Input,
  Col,
  Button,
  Card,
  CardColumns,
  Row,
  NavItem,
  Nav,
  InputGroupAddon,
  InputGroup,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import {
  faPencilAlt,
  faEllipsisH,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull,
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { serverApi } from '../components/api';

const Todopage = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [lists, setLists] = useState(null);
  const [listname, setListname] = useState('');
  const [todo, setTodo] = useState('');
  const [clicked, setClicked] = useState(false);
  const [inputvalue, setInputvalue] = useState('');
  const [newTodo, setNewtodo] = useState('');
  const [newList, setNewlist] = useState('');
  const [boardn, setBoardn] = useState('');
  const [boardClicked, setBoardclicked] = useState(true);
  const [boardchangeInput, setBoardchangeInput] = useState('');

  const addList = async e => {
    console.log('이름이요', e.target);
    if (e.target.value) {
      await serverApi.addList(token, newList, match.params.boardid);
      setNewlist('');
      preload();
    }
  };

  const addTodo = async (e, listid, index) => {
    console.log('이름이요', e.target.value);
    if (e.target.value) {
      await serverApi.addTodo(
        token,
        e.target.value,
        match.params.boardid,
        listid
      );

      const newTodos = [...lists];

      console.log(newTodos);

      newTodos.map(listt => {
        console.log('dkdkdk', listid);
        console.log('dkdkdk11', listt.id);
        if (listt.id === listid) {
          listt.newTodo = '';
        }
      });
      setLists(newTodos);

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

  const modifylist = (e, listid, index) => {
    const newListn = [...lists];
    console.log(index);
    console.log(newListn[index]);
    newListn.map(list => {
      if (list.id === listid) {
        list.clicked = true;
      }
    });
    setListname(lists[index]['list_name']);
    setLists(newListn);
  };

  const modifycompList = async (listid, index, event) => {
    const newListn = [...lists];

    newListn.map(list => {
      if (list.id === listid) {
        list.clicked = false;
      }
    });

    setLists(newListn);

    if (inputvalue) {
      await serverApi.changeTodo(
        token,
        inputvalue,
        match.params.boardid,
        listid
      );
    }

    preload();
  };

  const boardnamechange = async e => {
    setBoardchangeInput();
    console.log('name', boardchangeInput);
    setBoardclicked(true);
    setBoardchangeInput('');
    await serverApi.changeBoard(token, match.params.boardid, boardchangeInput);
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

      const board = await serverApi.getBoardn(userToken, match.params.boardid);
      console.log('hihihi', board);

      setBoardn(board.data[0].board_name);
      console.log('hihihi', dataLists);
      setLists(dataLists.data);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      <Nav style={{ marginTop: 10 }}>
        {boardClicked ? (
          <NavItem
            onClick={() => {
              setBoardclicked(!boardClicked);
              setBoardchangeInput(boardn);
            }}
          >
            <h4>{boardn}</h4>
          </NavItem>
        ) : (
          <NavItem>
            <InputGroup>
              <Input
                onChange={e => {
                  setBoardchangeInput(e.target.value);
                }}
                value={boardchangeInput}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={boardnamechange}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </NavItem>
        )}
      </Nav>
      {lists ? (
        <CardColumns style={{ marginTop: 10 }}>
          {lists.map((list, index) => {
            return (
              <Card key={list.id} color="info" style={{}}>
                <div style={{ width: 205, marginBottom: 3 }}>
                  <h5 style={{ marginTop: 10 }}>
                    {list.list_name}

                    <Button
                      close
                      onClick={() => {
                        deleteList(list.id);
                      }}
                    />
                  </h5>
                </div>

                {list.todos.map(toDo => {
                  return !toDo.clicked ? (
                    <Card
                      style={{ width: 200 }}
                      key={toDo.id}
                      onClick={() => {
                        modifyTodo(toDo.id, list.id, toDo.todo, index);
                      }}
                    >
                      {toDo.todo}
                      <Button
                        close
                        onClick={() => {
                          deleteTodo(toDo.id, list.id);
                        }}
                      />
                    </Card>
                  ) : (
                    <>
                      <InputGroup>
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
                        <InputGroupAddon addonType="append">
                          <Button
                            id={'mod' + toDo.id}
                            onClick={() => {
                              modifycompTodo(toDo.id, list.id, index);
                            }}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </>
                  );
                })}
                <Input
                  key={list.id}
                  id={list.id}
                  type="text"
                  name="todoname"
                  placeholder="새로운 할일 생성"
                  value={lists[index]['newTodo'] ? lists[index]['newTodo'] : ''}
                  onChange={e => {
                    const newTodos = [...lists];
                    newTodos.map(listt => {
                      if (listt.id === list.id) {
                        listt.newTodo = e.target.value;
                      }
                    });
                    setLists(newTodos);
                    setNewtodo(e.target.value);
                  }}
                  onClick={e => {
                    addTodo(e, list.id, index);
                  }}
                />
              </Card>
            );
          })}
          <Card>
            <Input
              type="text"
              id="makenewlist"
              name="listname"
              placeholder="새로운 리스트 생성"
              value={newList}
              onChange={e => {
                setNewlist(e.target.value);
              }}
              onClick={addList}
            />
          </Card>
        </CardColumns>
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
