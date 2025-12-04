import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

// export type MicrophoneState = "on" | "off";
interface MicrophoneButtonProps {
  state: boolean;
  toggleMicrophone: () => void;
}

export function MicrophoneButton({
  state,
  toggleMicrophone,
}: MicrophoneButtonProps) {
  return (
    <button
      className="hover:cursor-pointer hover:bg-orange-100 transition-colors duration-200 p-2 text-[3rem] hover:rounded-2xl"
      onClick={toggleMicrophone}
    >
      <>
        {state && <CiMicrophoneOn></CiMicrophoneOn>}
        {!state && <CiMicrophoneOff></CiMicrophoneOff>}
      </>
    </button>
  );
}
