import { Chatbox } from "../components/Chatbox";
import { Message } from "../components/Message";

export function Chat() {
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
        <Chatbox></Chatbox>
      </div>
      {/* Message */}
      <Message></Message>
    </div>
  );
}
