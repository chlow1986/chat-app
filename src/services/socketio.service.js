import { io } from "socket.io-client";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
      transports: ["websocket"],
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(msg) {
    if (this.socket) {
      this.socket.emit("chat message", msg);
    }
  }

  onReceive(callback) {
    this.socket.on("chat message", callback);
  }

  onReceiveEmoji(callback) {
    this.socket.on("chat emoji", callback);
  }

  onJoinRoom() {
    this.socket.emit("join room");
  }
}

export default new SocketioService();
