const http = require("http");
const path = require("path");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");
  let otherParams = [];

  for (const [key, value] of url.searchParams.entries()) {
    if (key !== "hello") {
      otherParams.push({ key, value });
    }
  }

  if (otherParams.length > 0) {
    response.status = 500;
    response.statusMessage = "Internal Server Error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();
    return;
  }

  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/json";
    response.write(getUsers());
    response.end();
    return;
  }
  if (!name) {
    response.status = 400;
    response.statusMessage = "Bad Request";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();
    return;
  }
  if (name) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${name}!`);
    response.end();
  }

  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, World!");
  response.end();
});

server.listen(3000, () => {
  console.log("Сервер запущен на 3000 порту");
});
