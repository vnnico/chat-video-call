import moment from "moment";
import type { Moment } from "moment";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { socket } from "../services/socket";
import { v4 } from "uuid";

interface MessageProps {
  activeChat: string;
  peerName: string;
  peerId: string;
  isGroup: boolean;
}

type Message = {
  id: string;
  roomId: string;
  senderId: string | undefined;
  recipientId: string;
  text: string;
  createdAt: Moment;
};

export function Message({
  activeChat,
  peerName,
  peerId,
  isGroup,
}: MessageProps) {
  const [messageBox, setMessageBox] = useState<Message[]>([]);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  // Listen for initial messages
  useEffect(() => {
    if (!activeChat) return;

    const handleSync = ({ data }: any) => {
      const parsedData = data.map((m: Message) => ({
        ...m,
        createdAt: moment(m.createdAt),
      }));
      setMessageBox(parsedData);
      setIsSend(true);
    };

    const handleNewMessage = ({ data }: any) => {
      const { message, tempId } = data;

      // Check if current active chat room matches with incoming message
      // Original sender's message bubble, update its ID and createdAt to match server truth.
      if (message.roomId !== activeChat) return;

      setMessageBox((prev) => {
        const tempExists = prev.some((m) => m.id === tempId);
        if (tempExists) {
          return prev.map((msg) =>
            msg.id === tempId
              ? { ...msg, id: message.id, createdAt: moment(message.createdAt) }
              : msg
          );
        }
        return [...prev, { ...message, createdAt: moment(message.createdAt) }];
      });
    };

    // Listen for stored messages
    socket.on("sync messages", handleSync);

    // Listen for incoming message
    socket.on("new message", handleNewMessage);

    return () => {
      socket.off("sync messages", handleSync);
      socket.off("new message", handleNewMessage);
    };
  }, [activeChat, user]);

  // Socket send message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChat) return;

    if (!message || message.trim() === "") return;

    const tempId = v4();

    const msg: Message = {
      id: tempId,
      roomId: activeChat,
      senderId: user?.id,
      recipientId: peerId,
      text: message,
      createdAt: moment(),
    };

    // Push to bubble
    setMessageBox([...messageBox, msg]);

    // Send only if socket is connected
    if (socket.connected) {
      socket.emit("send message", { msg }, (res: any) => {
        if (!res?.ok) alert("failed to send message");

        // Set status is sent
      });
    } else {
      // Push to offline storage
    }

    setMessage("");
  };

  // Handle message input
  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {activeChat && peerName ? (
        <div className="bg-amber-50 w-full flex flex-col">
          {/* Header */}
          <div className="text-xl bg-orange-100 h-14">
            <div className="flex my-auto gap-3 p-2">
              <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
                <img
                  src="./public/image/profile.webp"
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <p className="font-semibold text-md my-auto">{peerName}</p>
              <p className="ms-auto text-md my-auto hover:cursor-pointer hover:bg-amber-50 transition-colors duration-200 p-2 rounded-lg">
                Video Call
              </p>
            </div>
          </div>
          {/* Message Box */}
          <div
            className="h-full flex flex-col overflow-y-auto no-scrollbar pr-2 p-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cpath fill='none' stroke='rgba(217,119,6,0.15)' stroke-width='1' d='M0 10 Q 10 0, 20 10 T 40 10'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          >
            {/* Chat Bubbles */}
            {messageBox &&
              messageBox?.map((cb, index) => (
                <div
                  key={cb.id}
                  className={
                    index > 0 &&
                    (cb.senderId !== messageBox.at(index + 1)?.senderId ||
                      cb.recipientId !== messageBox.at(index + 1)?.recipientId)
                      ? "mb-6"
                      : "mb-1"
                  }
                >
                  {/* Day and time title */}
                  {index === 0 ||
                  (index > 0 &&
                    cb.createdAt.day() !==
                      messageBox.at(index - 1)?.createdAt.day()) ? (
                    <div className="w-full text-center py-4">
                      <p className="text-[12px] text-gray-700">
                        {cb.createdAt.format("dddd, DD MMMM YYYY")}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Chat Bubble */}
                  <div className="flex gap-3">
                    {isGroup && cb.senderId !== user?.id && (
                      <div className="rounded-full w-[40px] overflow-hidden h-[40px]">
                        {index === 0 ||
                        (index > 0 &&
                          (cb.senderId !== messageBox.at(index + 1)?.senderId ||
                            cb.recipientId !==
                              messageBox.at(index + 1)?.recipientId)) ? (
                          <img
                            src="./public/image/profile.webp"
                            alt=""
                            className="w-full object-cover"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    <div
                      key={cb.id}
                      className={` w-fit max-w-[20rem] break-words py-2 rounded-lg ps-3 pe-4  ${
                        cb.senderId === user?.id
                          ? "ms-auto bg-amber-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {isGroup &&
                        cb.senderId !== user?.id &&
                        (index === 0 ||
                          (index > 0 &&
                            cb.recipientId !==
                              messageBox.at(index - 1)?.recipientId)) && (
                          <p className="text-sm text-red-500 pb-2 font-semibold ">
                            {cb.recipientId}
                          </p>
                        )}
                      <div className="flex items-end gap-2 ">
                        <p className="text-md break-all whitespace-pre-wrap overflow-hidden">
                          {cb.text}
                        </p>
                        <p className="text-[11px] text-gray-700 whitespace-nowrap flex-shrink-0 ">
                          {moment(cb.createdAt).format("LT")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Message Input */}
          <form onSubmit={sendMessage} className="bg-orange-100 flex gap-2 p-3">
            <div className="w-full rounded-lg bg-amber-50 p-4">
              <input
                type="text"
                value={message}
                placeholder="Type a message"
                className="w-full outline-amber-50 focus:outline-none"
                onChange={handleMessage}
              />
            </div>
            <button
              className="text-sm m-auto cursor-pointer p-5 hover:bg-amber-100 hover:rounded-lg"
              disabled={!isSend}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div
          className="w-full flex"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cpath fill='none' stroke='rgba(217,119,6,0.15)' stroke-width='1' d='M0 10 Q 10 0, 20 10 T 40 10'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        >
          <div className="bg-orange-100 m-auto p-8 rounded-xl">
            <p className="text-md">Welcome to Chatting Apps!</p>
          </div>
        </div>
      )}
    </>
  );
}
