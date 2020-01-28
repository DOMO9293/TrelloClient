import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const Api = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const serverApi = {
  logIn: (id, ps) =>
    Api.post('users/signin', {
      email: id,
      password: ps
    }),
  signUp: (id, ps, username) =>
    Api.post('users/signup', {
      email: id,
      password: ps,
      userName: username
    }),
  getUser: (usertoken, id) =>
    Api.get(`users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': usertoken
      }
    }),
  getBoards: usertoken =>
    Api.get('boards/', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': usertoken
      }
    }),
  getBoardn: (usertoken, boardid) =>
    Api.get(`boards/${boardid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': usertoken
      }
    }),
  addBoard: (usertoken, boardname) =>
    Api.post(
      'boards/addItem',
      {
        board_name: boardname
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  addList: (usertoken, listname, boardid) =>
    Api.post(
      'lists/addItem',
      {
        list_name: listname,
        boardId: boardid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  addTodo: (usertoken, toDo, boardid, listid) =>
    Api.post(
      `lists/${listid}/addItem`,
      {
        todo: toDo,
        boardId: boardid,
        listId: listid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  getLists: (usertoken, boardid) =>
    Api.get(`lists/${boardid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': usertoken
      }
    }),
  deleteTodo: (usertoken, todoid, listid, boardid) =>
    Api.post(
      `lists/${listid}/${todoid}/delete`,
      {
        id: todoid,
        boardId: boardid,
        listId: listid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  deleteList: (usertoken, listid, boardid) =>
    Api.post(
      `lists/${listid}/delete`,
      {
        boardId: boardid,
        listId: listid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  deleteBoard: (usertoken, boardid) =>
    Api.post(
      `boards/delete`,
      {
        boardId: boardid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  changeTodo: (usertoken, todo, todoid, boardid, listid) =>
    Api.post(
      `lists/${listid}/modify`,
      {
        todo: todo,
        todoId: todoid,
        boardId: boardid,
        listId: listid
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  changeBoard: (usertoken, boardid, board_name) =>
    Api.post(
      `boards/${boardid}/modify`,
      {
        boardId: boardid,
        board_name: board_name
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    ),
  changeUser: (usertoken, userName, password) =>
    Api.post(
      `users/modify`,
      {
        password: password,
        userName: userName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': usertoken
        }
      }
    )
};
