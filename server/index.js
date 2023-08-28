const path = require("path");
const express = require("express");
const { createServer } = require("http"); // add this require
const { Server } = require("socket.io"); // and also require the socket.io module
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

const app = express();

// create an httpServer from the Express app
const httpServer = createServer(app);

// and create the socket.io server from the httpServer
const io = new Server(httpServer);

// then list to the connection event and get a socket object
io.on("connection", (socket) => {
  // here you can do whatever you want with the socket of the client, in this
  // example I'm logging the socket.id of the client
  console.log(socket.id, "connected");
  // // and I emit an event to the client called `event` with a simple message
  // socket.emit("event", "connected!");
  // // and I start listening for the event `something`
  // socket.on("something", (data) => {
  //   // log the data together with the socket.id who send it
  //   console.log(socket.id, data);
  //   // and emeit the event again with the message pong
  //   socket.emit("event", "pong");
  // });
});

app.use(compression());
app.use(express.static("public", { maxAge: "1h" }));
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));
app.use(morgan("tiny"));
app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({ build: require("./build") })
    : (req, res, next) => {
        purgeRequireCache();
        const build = require("./build");
        return createRequestHandler({ build, mode: MODE })(req, res, next);
      }
);

const port = process.env.PORT || 3000;

// instead of using `app.listen` we use `httpServer.listen`
httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
