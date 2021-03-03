//请求安装axios
// import axios from "axios";
import axios from "../utils/http";
// console.log(axios);
// 要有对相应请求函数

export function fetchPhotos(p) {
  // http://localhost:8081

  return axios.get("/getPhotos", {
    params: { p },
  });
}

export function fetchPhoto(id) {
  // body

  return axios.get("/getPhoto", {
    params: {
      pId: id,
    },
  });
}

export function uploadPhotos(file, onUploadProgress) {
  const formdata = new FormData();
  formdata.append("img", file);
  return axios.post("/upload", formdata, {
    onUploadProgress,
  });
}

// fetch
export function fetchLogin(username, password) {
  return axios.post("/login", {
    username,
    password,
  });
}
