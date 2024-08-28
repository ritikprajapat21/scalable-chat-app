import { Server } from "socket.io";
import Redis from "ioredis";
import env from "dotenv";

env.config();

const pub = new Redis({
  host: process.env.REDIS_URL,
  port: parseInt(process.env.REDIS_PORT as string),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});
const sub = new Redis({
  host: process.env.REDIS_URL,
  port: parseInt(process.env.REDIS_PORT as string),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;

    io.on("connection", (socket) => {
      socket.on("event:message", async ({ message }: { message: string }) => {
        // Publish to Redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
