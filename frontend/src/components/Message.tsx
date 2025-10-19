import { v4 } from "uuid";

export function Message() {
  const chatBubbles = [
    {
      id: v4(),
      ownedBy: 1,
      text: "nic mau king pangsit ga",
      timeAt: "17:30",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "gw otw pulang bntr lg",
      timeAt: "17:31",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "p",
      timeAt: "17:31",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "bntr psn gojek",
      timeAt: "17:32",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "kabarin kalo smpe",
      timeAt: "17:32",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "oke",
      timeAt: "17:32",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "dah sampe",
      timeAt: "17:45",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "lu mau apa",
      timeAt: "17:48",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "gw psen dlu aja ya",
      timeAt: "17:49",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "sabar macet",
      timeAt: "17:51",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "ada truk molen 2 ngalang jalan",
      timeAt: "17:51",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "okok",
      timeAt: "17:51",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "kevin jg lagi otw",
      timeAt: "17:52",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "ajak david juga",
      timeAt: "17:53",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "abar gw chat",
      timeAt: "17:54",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "avjdsij vovnsdoivncsoivnoisdcvsodicnsodncsidcnosdvnsocnsdoicjsdoicjsdoicvsdionsdnsodnvonsvosnv",
      timeAt: "17:54",
    },
    {
      id: v4(),
      ownedBy: 1,
      text: "apaan njirr",
      timeAt: "17:54",
    },
    {
      id: v4(),
      ownedBy: 2,
      text: "kepencet",
      timeAt: "17:54",
    },
  ];

  const currentId = 1;
  return (
    <div className="bg-amber-50 w-full flex flex-col">
      {/* Header */}
      <div className="text-xl bg-orange-100 h-14">
        <div className="flex my-auto gap-3 p-2">
          <div className="rounded-full w-[40px] overflow-hidden">
            <img
              src="./public/image/profile.webp"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <p className="font-semibold text-md my-auto">Nico</p>
          <p className="ms-auto text-md my-auto">Video Call</p>
        </div>
      </div>
      {/* Message Box */}
      <div
        className="h-full flex flex-col overflow-y-auto no-scrollbar pr-2 gap-5 p-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cpath fill='none' stroke='rgba(217,119,6,0.15)' stroke-width='1' d='M0 10 Q 10 0, 20 10 T 40 10'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      >
        {/* Chat Bubbles */}
        {chatBubbles.map((cb) => (
          <div
            key={cb.id}
            className={` w-fit max-w-[20rem] break-words py-2 rounded-lg ps-3 pe-4  ${
              cb.ownedBy === currentId
                ? "ms-auto bg-amber-100"
                : "bg-orange-100"
            }`}
          >
            <div className="flex items-end gap-2">
              <p className="text-md break-all whitespace-pre-wrap overflow-hidden">
                {cb.text}
              </p>
              <p className="text-[11px] text-gray-700 whitespace-nowrap flex-shrink-0">
                {cb.timeAt}
              </p>
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
            className="w-full outline-amber-50"
          />
        </div>
        <p className="text-sm m-auto p-1">Send</p>
      </div>
    </div>
  );
}
