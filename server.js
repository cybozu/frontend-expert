const http = require("http");
const events = require("events");
const watcher = require("@parcel/watcher");
const path = require("path");
const fs = require("fs");
const { Base64 } = require("js-base64");
const markdownToHtml = require("./markdown-to-html");

const postsDirPath = path.join(process.cwd(), "data", "posts");

const emitter = new events.EventEmitter();
const updatePostsEvent = "update-posts";
const subscription = watcher.subscribe(postsDirPath, (err, events) => {
  emitter.emit(updatePostsEvent, events);
});

process.on("exit", () => {
  subscription.unsubscribe();
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
      const event = events[events.length - 1];
      const id = new Date().toLocaleTimeString();
      markdownToHtml(fs.readFileSync(event.path)).then((html) => {
        res.writeHead(200, {
          ...headers,
          "Content-type": "text/event-stream",
          Connection: "keep-alive",
        });
        res.write("\n");
        res.write("id: " + id + "\n");
        res.write("retry: 1000\n");
        res.write(
          "data: " +
            JSON.stringify({
              path: event.path,
              html: Base64.encode(html),
            }) +
            "\n\n"
        );
      });
    };
    emitter.on(updatePostsEvent, emitterHandler);
  }
}

module.exports = function createServer() {
  return http.createServer(handler);
};
