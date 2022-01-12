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
watcher
  .subscribe(postsDirPath, (err, events) => {
    emitter.emit(updatePostsEvent, events);
  })
  .then((subscription) => {
    subscription.unsubscribe();
  });

function getLast(arr) {
  return arr[arr.length - 1];
}

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
      const event = getLast(events);
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
        const data = {
          path: getLast(event.path.split("/")).replace(/\.md$/, ""),
          html: Base64.encode(html),
        };
        console.log(data);
        res.write("data: " + JSON.stringify(data) + "\n\n");
      });
    };
    emitter.on(updatePostsEvent, emitterHandler);
  }
}

module.exports = function createServer() {
  return http.createServer(handler);
};
