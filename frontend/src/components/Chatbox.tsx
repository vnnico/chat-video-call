import { useRef } from "react";
import type { Chatbox } from "../pages/Chat";

interface ChatBoxProps {
  chatboxs: Chatbox[];
  openChat: (id: string, name: string, isGroup: boolean) => void;
  changeChatType: (chatType: string) => void;
}

export function Chatbox({ chatboxs, openChat, changeChatType }: ChatBoxProps) {
  const activeChatbox = useRef<string>("");

  return (
    <div className="w-full h-full gap-4 flex flex-col overflow-y-auto custom-scrollbar pr-1">
      <div className="flex gap-2 p-1">
        <div
          className="outline-2 hover:bg-amber-50 transition-colors duration-200 p-1 rounded-lg cursor-pointer"
          onClick={() => changeChatType("All")}
        >
          <p className="text-md">All</p>
        </div>
        <div
          className="outline-2 hover:bg-amber-50 transition-colors duration-200 p-1 rounded-lg cursor-pointer"
          onClick={() => changeChatType("Personal")}
        >
          <p className="text-md">Personal</p>
        </div>
        <div
          className="outline-2 hover:bg-amber-50 transition-colors duration-200 p-1 rounded-lg cursor-pointer"
          onClick={() => changeChatType("Groups")}
        >
          <p className="text-md">Groups</p>
        </div>
      </div>

      {/* Chatboxs */}
      {chatboxs.map((chatbox) => (
        <div
          className={
            activeChatbox.current === chatbox.id
              ? `flex gap-3 rounded-md bg-amber-50 p-2 cursor-pointer`
              : `flex gap-3 rounded-md hover:bg-amber-50 transition-colors duration-200 p-2 cursor-pointer `
          }
          key={chatbox.id}
          onClick={() => {
            openChat(chatbox.id, chatbox.name, chatbox.chatType === "Groups");
            activeChatbox.current = chatbox.id;
          }}
        >
          <div className="rounded-full w-[50px] overflow-hidden">
            <img
              src="./public/image/profile.webp"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{chatbox.name}</p>
            <div className="flex gap-2">
              {/* Has Read Icon */}
              {/* Msg */}
              <p className="text-sm">{chatbox.preview}</p>
            </div>
          </div>
          <div className="ms-auto flex flex-col">
            <p className="ms-auto text-sm text-gray-700">{chatbox.timeAt}</p>
            <div className="rounded-full bg-green-400 w-5 mt-1 ms-auto text-end ">
              <p className="text-sm text-center">{chatbox.totalMessages}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
