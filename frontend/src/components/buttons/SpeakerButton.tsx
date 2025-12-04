import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

// export type SpeakerState = "on" | "off";
interface SpeakerButtonProps {
  state: boolean;
  toggleSpeaker: () => void;
}
export function SpeakerButton({ state, toggleSpeaker }: SpeakerButtonProps) {
  return (
    <button
      className="hover:cursor-pointer hover:bg-orange-100 transition-colors duration-200 p-2 text-[3rem] hover:rounded-2xl"
      onClick={toggleSpeaker}
    >
      <>
        {state && <HiSpeakerWave></HiSpeakerWave>}
        {!state && <HiSpeakerXMark></HiSpeakerXMark>}
      </>
    </button>
  );
}
