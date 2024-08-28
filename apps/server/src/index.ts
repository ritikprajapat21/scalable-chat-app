import http from "http";
import SocketService from "./services/socket";
import env from "dotenv";

env.config();

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => console.log(`Listening at port ${PORT}`));

  socketService.initListeners();
}

init();
