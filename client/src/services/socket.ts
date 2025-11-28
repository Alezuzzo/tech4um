import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://tech4um.onrender.com';

const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
});

export default socket;
