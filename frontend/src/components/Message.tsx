import moment from "moment";
import type { Moment } from "moment";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

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

interface MessageProps {
  activeChat: string;
  peerName: string;
  isGroup: boolean;
}

type Message = {
  id: string;
  convId: string;
  ownedBy: number;
  name: string;
  text: string;
  timeAt: Moment;
};

export function Message({ activeChat, peerName, isGroup }: MessageProps) {
  const messages: Message[] = [
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "pp",
      timeAt: generateTime(2025, 10, 18, 10, 10),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "nic mau king pangsit ga",
      timeAt: generateTime(2025, 10, 19, 17, 10),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "gw otw pulang bntr lg",
      timeAt: generateTime(2025, 10, 19, 17, 10),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "p",
      timeAt: generateTime(2025, 10, 19, 17, 11),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "bntr psn gojek",
      timeAt: generateTime(2025, 10, 19, 17, 12),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "kabarin kalo smpe",
      timeAt: generateTime(2025, 10, 19, 17, 12),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "oke",
      timeAt: generateTime(2025, 10, 19, 17, 13),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "dah sampe",
      timeAt: generateTime(2025, 10, 19, 17, 20),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "lu mau apa",
      timeAt: generateTime(2025, 10, 19, 17, 23),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "gw psen dlu aja ya",
      timeAt: generateTime(2025, 10, 19, 17, 23),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "sabar macet",
      timeAt: generateTime(2025, 10, 19, 17, 31),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "ada truk molen 2 ngalang jalan",
      timeAt: generateTime(2025, 10, 19, 17, 33),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "okok",
      timeAt: generateTime(2025, 10, 19, 17, 35),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "kevin jg lagi otw",
      timeAt: generateTime(2025, 10, 19, 17, 36),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "ajak david juga",
      timeAt: generateTime(2025, 10, 19, 17, 38),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "abar gw chat",
      timeAt: generateTime(2025, 10, 19, 17, 38),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "avjdsij vovnsdoivncsoivnoisdcvsodicnsodncsidcnosdvnsocnsdoicjsdoicjsdoicvsdionsdnsodnvonsvosnv",
      timeAt: generateTime(2025, 10, 19, 17, 40),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "apaan njirr",
      timeAt: generateTime(2025, 10, 19, 17, 41),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 2,
      name: "Nico",
      text: "kepencet",
      timeAt: generateTime(2025, 10, 19, 18, 30),
    },
    {
      id: v4(),
      convId: "conv1",
      ownedBy: 1,
      name: "Bro",
      text: "oiii",
      timeAt: generateTime(2025, 10, 20, 18, 30),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 1,
      name: "Bro",
      text: "oiii",
      timeAt: generateTime(2025, 11, 20, 18, 30),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 2,
      name: "Nico",
      text: "testingg broo",
      timeAt: generateTime(2025, 11, 20, 18, 33),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 1,
      name: "Bro",
      text: "mana yang lain",
      timeAt: generateTime(2025, 11, 20, 18, 33),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 3,
      name: "David",
      text: "apa ni",
      timeAt: generateTime(2025, 11, 20, 19, 30),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 4,
      name: "Hansen",
      text: "eakkk",
      timeAt: generateTime(2025, 11, 20, 19, 35),
    },
    {
      id: v4(),
      convId: "group1",
      ownedBy: 4,
      name: "Hansen",
      text: "gas ayce",
      timeAt: generateTime(2025, 11, 20, 19, 35),
    },
  ];
  const [messageBox, setMessageBox] = useState<Message[]>([]);

  const currentId = 1;

  useEffect(() => {
    if (activeChat) {
      setMessageBox(messages.filter((msg) => msg.convId === activeChat));
    }
  }, [activeChat]);
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
              messageBox.map((cb, index) => (
                <div
                  className={
                    index === 0 ||
                    (index > 0 && cb.name !== messageBox.at(index + 1)?.name)
                      ? "mb-6"
                      : "mb-1"
                  }
                >
                  {/* Day and time title */}
                  {index === 0 ||
                  (index > 0 &&
                    cb.timeAt.day() !==
                      messageBox.at(index - 1)?.timeAt.day()) ? (
                    <div className="w-full text-center py-4">
                      <p className="text-[12px] text-gray-700">
                        {cb.timeAt.format("dddd, DD MMMM YYYY")}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Chat Bubble */}
                  <div className="flex gap-3">
                    {isGroup && cb.ownedBy !== currentId && (
                      <div className="rounded-full w-[40px] overflow-hidden h-[40px]">
                        {index === 0 ||
                        (index > 0 &&
                          cb.name !== messageBox.at(index - 1)?.name) ? (
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
                        cb.ownedBy === currentId
                          ? "ms-auto bg-amber-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {isGroup &&
                        cb.ownedBy !== currentId &&
                        (index === 0 ||
                          (index > 0 &&
                            cb.name !== messageBox.at(index - 1)?.name)) && (
                          <p className="text-sm text-red-500 pb-2 font-semibold ">
                            {cb.name}
                          </p>
                        )}
                      <div className="flex items-end gap-2 ">
                        <p className="text-md break-all whitespace-pre-wrap overflow-hidden">
                          {cb.text}
                        </p>
                        <p className="text-[11px] text-gray-700 whitespace-nowrap flex-shrink-0">
                          {moment(cb.timeAt).format("LT")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Message Input */}
          <div className="bg-orange-100 flex gap-2 p-3">
            <div className="w-full rounded-lg bg-amber-50 p-4">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full outline-amber-50 focus:outline-none"
              />
            </div>
            <p className="text-sm m-auto p-1">Send</p>
          </div>
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
