import { useEffect, useState } from "react";
import { Chatbox } from "../components/Chatbox";
import { Message } from "../components/Message";
import { v4 } from "uuid";

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

const chatboxsList: Chatbox[] = [
  {
    id: "conv1",
    name: "Nico",
    preview: "lg dmn?",
    timeAt: "18:57",
    totalMessages: 1,
    isRead: false,
    chatType: "Personal",
    members: [],
  },
  {
    id: v4(),
    name: "Ayana",
    preview: "ayo kesini",
    timeAt: "16:50",
    totalMessages: 3,
    isRead: false,
    chatType: "Personal",
    members: [],
  },
  {
    id: v4(),
    name: "Pak Ayub",
    preview: "Sudah didepan pak",
    timeAt: "16:30",
    totalMessages: 1,
    isRead: false,
    chatType: "Personal",
    members: [],
  },
  {
    id: v4(),
    name: "Galon",
    preview: "makasih mas",
    timeAt: "16:30",
    totalMessages: 1,
    isRead: false,
    chatType: "Personal",
    members: [],
  },
  {
    id: v4(),
    name: "Group Angkatan '20",
    preview: "baik terimakasih",
    timeAt: "16:30",
    totalMessages: 1,
    isRead: true,
    chatType: "Groups",
    members: ["Andi", "Tono", "Kina"],
  },
  {
    id: "group1",
    name: "EXHUMA",
    preview: "oke w otw",
    timeAt: "16:30",
    totalMessages: 1,
    isRead: false,
    chatType: "Groups",
    members: ["David", "Hansen", "Nata", "Wilson", "Kevin", "Nico"],
  },
];

export function Chat() {
  let [activeChat, setActiveChat] = useState<string>("");
  let [chatType, setChatType] = useState<string>("All");

  let [peerName, setPeerName] = useState<string>("");
  let [isGroup, setIsGroup] = useState<boolean>(false);
  let [chatboxs, setChatboxs] = useState<Chatbox[]>(chatboxsList);

  const openChat = (id: string, name: string, isGroup: boolean) => {
    setActiveChat(id);
    setPeerName(name);
    setIsGroup(isGroup);
  };

  const changeChatType = (chatType: string) => {
    setChatType(chatType);
  };

  useEffect(() => {
    if (chatType === "All") {
      setChatboxs(chatboxsList);
    } else {
      setChatboxs(chatboxsList.filter((cb) => cb.chatType === chatType));
    }
  }, [chatType]);

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
        isGroup={isGroup}
      ></Message>
    </div>
  );
}
