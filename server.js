const http = require("http");
const events = require("events");
const watcher = require("@parcel/watcher");
const path = require("path");

const postsDirPath = path.join(process.cwd(), "data", "posts");

const emitter = new events.EventEmitter();
const updatePostsEvent = "update-posts";
const subscription = watcher.subscribe(postsDirPath, (err, events) => {
  emitter.emit(updatePostsEvent, events);
});

function handler(req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Access-Control-Allow-Credentials": "true",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.url === "/stream") {
    const emitterHandler = (events) => {
      for (const event of events) {
        const id = new Date().toLocaleTimeString();
        res.writeHead(200, {
          ...headers,
          "Content-type": "text/event-stream",
          Connection: "keep-alive",
        });
        res.write("\n");
        res.write("id: " + id + "\n");
        res.write("retry: 1000\n");
        res.write("data: " + JSON.stringify(event) + "\n\n");
      }
    };
    emitter.on(updatePostsEvent, emitterHandler);
  }
}

module.exports = function createServer() {
  return http.createServer(handler);
};
