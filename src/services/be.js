import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const headers = {
  "Content-Type": "application/json;charset=utf-8",
  // "Access-Control-Allow-Origin": "*",
};

export const GetTodosAPI = () => {
  return new Promise((res, rej) => {
    axios
      .get(process.env.REACT_APP_GO_TODO_API + "/api/todos", {
        headers: {
          ...headers,
        },
      })
      .then((payload) => {
        console.log(payload.data);
        res(payload.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const CreateTodoAPI = (todo) => {
  return new Promise((res, rej) => {
    axios
      .post(process.env.REACT_APP_GO_TODO_API + "/api/todos", todo, {
        headers: { ...headers },
      })
      .then((payload) => {
        console.log(payload.data);
        res(payload.data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
