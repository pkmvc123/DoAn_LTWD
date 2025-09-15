const { WebSocketServer } = require("ws");

let wss;
let clients = new Set();

function initWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("{/} NQH Dev: Client Connected");
    clients.add(ws);

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
      ws.send("Echo: " + message.toString());
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("{/} NQH Dev: Client Disconnected");
    });
  });
}

function broadcastOrder(orderData) {
  const data = JSON.stringify({ type: "orderFood", payload: orderData });
  for (let client of clients) {
    if (client.readyState === 1) {
      client.send(data);
    }
  }
}

module.exports = {
  initWebSocket,
  broadcastOrder,
};
