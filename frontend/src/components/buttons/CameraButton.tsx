import { LuCamera, LuCameraOff } from "react-icons/lu";

// export type CameraState = "on" | "off" | "switch";
interface CameraButtonProps {
  state: boolean;
  toggleCamera: () => void;
}
export function CameraButton({ state, toggleCamera }: CameraButtonProps) {
  return (
    <button
      className="hover:cursor-pointer hover:bg-orange-100 transition-colors duration-200 p-2 text-[3rem] hover:rounded-2xl"
      onClick={toggleCamera}
    >
      <>
        {state && <LuCamera></LuCamera>}
        {!state && <LuCameraOff></LuCameraOff>}
        {/* {state === "switch" && <LuSwitchCamera></LuSwitchCamera>} */}
      </>
    </button>
  );
}
