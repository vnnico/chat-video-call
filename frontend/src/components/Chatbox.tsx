import { v4 } from "uuid";

export function Chatbox() {
  const chatboxs = [
    {
      id: v4(),
      name: "Nico",
      preview: "lg dmn?",
      timeAt: "18:57",
      totalMessages: 1,
      isRead: false,
      messageId: 1,
    },
    {
      id: v4(),
      name: "Ayana",
      preview: "ayo kesini",
      timeAt: "16:50",
      totalMessages: 3,
      isRead: false,
      messageId: 2,
    },
    {
      id: v4(),
      name: "Pak Ayub",
      preview: "Sudah didepan pak",
      timeAt: "16:30",
      totalMessages: 1,
      isRead: false,
      messageId: 3,
    },
  ];

  return (
    <div className="w-full h-full gap-4 flex flex-col overflow-y-auto custom-scrollbar pr-1">
      {chatboxs.map((chatbox) => (
        <div
          className="flex gap-3 rounded-md hover:bg-amber-50 transition-colors duration-200 p-2 cursor-pointer "
          key={chatbox.id}
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
