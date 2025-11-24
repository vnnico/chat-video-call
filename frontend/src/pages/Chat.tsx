import { useEffect, useState } from "react";
import { Chatbox } from "../components/Chatbox";
import { Message } from "../components/Message";
import { socket } from "../services/socket";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import moment, { type Moment } from "moment";

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

export function Chat() {
  let [activeChat, setActiveChat] = useState<string>("");
  let [chatType, setChatType] = useState<string>("All");

  let [peerName, setPeerName] = useState<string>("");
  let [peerId, setPeerId] = useState<string>("");
  let [isGroup, setIsGroup] = useState<boolean>(false);
  let [chatboxs, setChatboxs] = useState<Chatbox[]>([]);

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
    // Check if user has set
    if (!user) return;

    // Set socket auth
    socket.auth = {
      user,
    };
    // Socket connect to server (harusnya ada middleware)
    socket.connect();

    // LISTEN: Get list of the room upon connection
    socket.on("chats list", ({ data }) => {
      setChatboxs(data);
    });

    // LISTEN: Get notification
    socket.on("new notification", ({ data }) => {
      console.log(data);
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
    });
  }, [user]);

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
      ></Message>
    </div>
  );
}
