import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import moment, { Moment } from "moment";
import cors from "cors";

const app: Application = express();
const PORT = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const generateTime = (
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number
): Moment => {
  return moment().set({
    year,
    month,
    date,
    hour,
    minute,
    second: 0,
  });
};

const usersDB = [
  {
    id: "nico",
    name: "Nico",
  },
  {
    id: "kevin",
    name: "Kevin",
  },
  {
    id: "wilson",
    name: "Wilson",
  },
  {
    id: "hansen",
    name: "Hansen",
  },
  {
    id: "david",
    name: "David",
  },
  {
    id: "nata",
    name: "Nata",
  },
];

const rooms = [
  {
    id: "room_nico_nata",
    user1Id: "nico",
    user2Id: "nata",
  },
  {
    id: "room_hansen_nico",
    user1Id: "hansen",
    user2Id: "nico",
  },
  {
    id: "room_wilson_kevin",
    user1Id: "kevin",
    user2Id: "wilson",
  },
];

type Message = {
  id: string;
  roomId: string;
  senderId: string | undefined;
  recipientId: string;
  text: string;
  createdAt: Moment;
};

const messages: Message[] = [];

type Chatbox = {
  id: string;
  name: string;
  preview: string;
  timeAt: string;
  totalMessages: number;
  isRead: boolean;
  chatType: string;
  members: string[];
};

const findUserById = (id: string) => usersDB.find((u) => u.id === id);

const formatChatTime = (iso: Moment) => {
  const m = iso;
  const now = moment();

  // Same day → "18:20"
  if (m.isSame(now, "day")) {
    return m.format("HH:mm");
  }

  // Other days → "1/2/2025"
  return m.format("D/M/YYYY");
};

const buildChatListForUser = (userId: string): Chatbox[] => {
  const userRooms = rooms.filter(
    (room) => room.user1Id === userId || room.user2Id === userId
  );

  return userRooms.map((room) => {
    const roomMessages = messages
      .filter((m) => m.roomId === room.id)
      .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());

    const lastMessage = roomMessages[0];

    const otherUserId = room.user1Id === userId ? room.user2Id : room.user1Id;
    const otherUser = findUserById(otherUserId);

    const name = otherUser?.name ?? otherUserId;

    return {
      id: room.id,
      name,
      preview: lastMessage ? lastMessage.text : "",
      timeAt: lastMessage ? formatChatTime(lastMessage.createdAt) : "",
      totalMessages: roomMessages.length,
      isRead: lastMessage ? lastMessage.senderId === userId : true,
      chatType: "private",
      members: [room.user1Id, room.user2Id],
    };
  });
};

const registerOnline = (userId: string, socketId: string) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }
  onlineUsers.get(userId).add(socketId);
};

const getRoomId = (senderId: string, recipientId: string) => {
  const room = rooms.filter((room) => {
    const temp = [room.user1Id, room.user2Id];
    if (temp.includes(senderId) && temp.includes(recipientId)) return true;

    return false;
  });

  if (room.length > 0) return room[0]?.id;

  return null;
};

const createRoom = (senderId: string, recipientId: string) => {
  const roomId = uuidv4();

  rooms.push({
    id: roomId,
    user1Id: senderId,
    user2Id: recipientId,
  });

  return roomId;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Session storage for online users
const onlineUsers = new Map();

// Socket server
io.on("connection", (socket) => {
  const user = socket.handshake.auth.user;
  if (!user) {
    return;
  }

  // Register each socket to online users list
  registerOnline(user.id, socket.id);

  // Send list of chatrooms
  const chatroomsList = buildChatListForUser(user.id);
  io.to(socket.id).emit("chats list", { data: chatroomsList });

  // Listen for incoming message
  socket.on("send message", ({ msg, isOffline = false }, ack) => {
    // Store new message
    const newMsg = {
      id: uuidv4(),
      roomId: msg.roomId,
      senderId: msg.senderId,
      recipientId: msg.recipientId,
      text: msg.text,
      createdAt: msg.createdAt,
    };

    // Offline mode
    if (!isOffline) newMsg.createdAt = moment();

    messages.push(newMsg);

    // Broadcast to both sender and recipient
    io.to(newMsg.roomId).emit("new message", {
      data: { message: newMsg, tempId: msg.id },
    });

    // Get list of sockets in each peer and push it into list.
    let senderSockets = onlineUsers.get(msg.senderId) ?? [];
    let recipientSockets = onlineUsers.get(msg.recipientId) ?? [];

    let sockets = [...senderSockets, ...recipientSockets];

    // Send notification to user
    io.in(sockets).emit("new notification", {
      data: {
        message: newMsg.text,
        id: newMsg.roomId,
        timeAt: newMsg.createdAt,
      },
    });

    if (ack) ack({ ok: true, id: newMsg.id, createdAt: newMsg.createdAt });
  });

  // Send list of messages by room id
  socket.on("open chat", ({ senderId, recipientId }, ack) => {
    // Get the room id or create new one.
    let roomId = getRoomId(senderId, recipientId);
    if (!roomId) roomId = createRoom(senderId, recipientId);

    if (ack)
      ack({
        ok: true,
        roomId,
      });

    // Send all messages
    const msg = messages.filter((message) => message.roomId === roomId);
    socket.emit("sync messages", { data: msg });
  });

  // Send list of messages by room id
  socket.on("open chat by roomId", async ({ roomId }, ack) => {
    // Socket join room
    socket.join(roomId);

    // Send all messages
    const msg = messages
      .filter((m) => m.roomId === roomId)
      .map((m) => ({
        ...m,
        createdAt: moment(m.createdAt), // <<< FIX
      }))
      .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());

    console.log(msg);
    // await sleep(3000);

    // Get recipient
    const roomTr = rooms.filter((room) => room.id === roomId);
    const recipientId =
      roomTr[0]?.user1Id === user.id ? roomTr[0]?.user2Id : roomTr[0]?.user1Id;

    if (ack) ack({ ok: true, peerId: recipientId });

    io.to(socket.id).emit("sync messages", { data: msg });
  });

  socket.on("join room", ({ roomId }, ack) => {
    // Socket join room
    socket.join(roomId);
    if (ack) ack({ ok: true });
  });

  socket.on("has online", ({ roomId }, ack) => {
    socket.to(roomId).emit("peer online", { data: roomId });
  });

  socket.on("refetch message", ({ roomId }, ack) => {
    // Send all messages
    const msg = messages
      .filter((m) => m.roomId === roomId)
      .map((m) => ({
        ...m,
        createdAt: moment(m.createdAt), // <<< FIX
      }))
      .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());

    // await sleep(3000);

    // Get recipient
    const roomTr = rooms.filter((room) => room.id === roomId);
    const recipientId =
      roomTr[0]?.user1Id === user.id ? roomTr[0]?.user2Id : roomTr[0]?.user1Id;

    if (ack) ack({ ok: true, peerId: recipientId });

    socket.to(roomId).emit("sync messages", { data: msg });
  });
});

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/login", async (req: Request, res: Response) => {
  const username: string = req.body.username;
  if (!username)
    res.status(400).json({
      data: null,
      message: "bad request",
    });

  const user = usersDB.filter((user) => username === user.name);

  if (user.length === 0)
    res.status(404).json({
      data: null,
      message: "user not found",
    });

  return res.status(200).json({
    data: user[0],
    message: "success",
  });
});

httpServer.listen(PORT, () => {
  console.log("Port listening");
});
