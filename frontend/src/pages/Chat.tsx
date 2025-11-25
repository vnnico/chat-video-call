import { useEffect, useState } from "react";
import { Chatbox } from "../components/Chatbox";
import { Message } from "../components/Message";
import { socket } from "../services/socket";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import moment, { type Moment } from "moment";
import { useStorage } from "../contexts/StorageContext";

export type Chatbox = {
  id: string;
  name: string;
  preview: string;
  timeAt: string;
  totalMessages: number;
  isRead: boolean;
  chatType: string;
  members: string[];
};

export type Message = {
  id: string;
  roomId: string;
  senderId: string | undefined;
  recipientId: string;
  text: string;
  createdAt: Moment;
};

export type OfflineMessage = Record<string, Message[]>;

export function Chat() {
  let [activeChat, setActiveChat] = useState<string>("");
  let [chatType, setChatType] = useState<string>("All");

  const { offlineStorage, setOfflineStorage } = useStorage();

  let [peerName, setPeerName] = useState<string>("");
  let [peerId, setPeerId] = useState<string>("");
  let [isGroup, setIsGroup] = useState<boolean>(false);
  let [chatboxs, setChatboxs] = useState<Chatbox[]>([]);

  const [messageBox, setMessageBox] = useState<Message[]>([]);

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const openChat = (id: string, name: string, isGroup: boolean) => {
    setActiveChat(id);
    setPeerName(name);
    setIsGroup(isGroup);
    setMessageBox([]);
    // Get all messages of current room
    // Id adalah roomId.
    socket.emit("open chat by roomId", { roomId: id }, (res: any) => {
      if (!res?.ok) return;
      setPeerId(res?.peerId);
    });
  };

  const changeChatType = (chatType: string) => {
    setChatType(chatType);
  };

  // useEffect(() => {
  //   if (chatType === "All") {
  //     setChatboxs(chatboxsList);
  //   } else {
  //     setChatboxs(chatboxsList.filter((cb) => cb.chatType === chatType));
  //   }
  // }, [chatType]);

  useEffect(() => {
    if (!user) return;

    socket.auth = { user };
    socket.connect();

    const handleConnect = async () => {
      console.log("YESSS");
      console.log("tetw : ", offlineStorage);

      try {
        // send offline messages
        for (const [roomId, messages] of Object.entries(offlineStorage)) {
          console.log("lesgo");
          await new Promise((resolve, reject) => {
            socket.emit("join room", { roomId }, (res: any) => {
              if (res?.ok) resolve(true);
              else reject("Failed to join room " + roomId);
            });
          });

          for (const msg of messages) {
            await new Promise((resolve, reject) => {
              socket.emit(
                "send message",
                { msg, isOffline: true },
                (res: any) => {
                  if (res?.ok) resolve(true);
                  else reject("Failed to send message");
                }
              );
            });
          }
        }

        // After reconnecting and in position of opening the chat
        if (
          Object.entries(offlineStorage).length > 0 &&
          activeChat.length > 0
        ) {
          socket.emit(
            "open chat by roomId",
            { roomId: activeChat },
            (res: any) => {
              if (!res?.ok) return;
            }
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Clearing offline storage");
        setOfflineStorage({});
      }
    };

    const handleDisconnect = () => {
      console.log("mulai disconnect...");
    };

    const handleChatsList = ({ data }: any) => {
      setChatboxs(data);
    };

    const handleNotification = ({ data }: any) => {
      setChatboxs((prev) => {
        const exist = prev.some((cb) => cb.id === data.id);

        if (!exist) return prev;

        return prev.map((cb) =>
          cb.id === data.id
            ? {
                ...cb,
                preview: data.message,
                timeAt: moment(data.timeAt).format("DD/MM/YYYY"),
              }
            : cb
        );
      });
    };
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("chats list", handleChatsList);
    socket.on("new notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chats list", handleChatsList);
      socket.off("new notification", handleNotification);
    };
  }, [user, offlineStorage]);

  return (
    <div className="w-full h-full flex divide-x divide-gray-200">
      {/* Contact List */}
      <div className="bg-orange-100 w-1/2 flex flex-col p-3 gap-3 ">
        <p className="text-xl font-semibold">Chats</p>

        {/* Search Bar */}
        <div className="w-full rounded-lg bg-amber-50 p-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-amber-50"
          />
        </div>

        {/* Message History */}
        {/* Contact */}
        <Chatbox
          chatboxs={chatboxs}
          openChat={openChat}
          changeChatType={changeChatType}
        ></Chatbox>
      </div>
      {/* Message */}

      <Message
        activeChat={activeChat}
        peerName={peerName}
        peerId={peerId}
        isGroup={isGroup}
        messageBox={messageBox}
        setMessageBox={setMessageBox}
      ></Message>
    </div>
  );
}
