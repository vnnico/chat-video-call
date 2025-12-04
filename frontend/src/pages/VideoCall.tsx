import { useState } from "react";
import { CameraButton } from "../components/buttons/CameraButton";
import { MicrophoneButton } from "../components/buttons/MicrophoneButton";
import { SpeakerButton } from "../components/buttons/SpeakerButton";
import { LuSwitchCamera } from "react-icons/lu";

export function VideoCall() {
  const [camera, setCamera] = useState<boolean>(true);
  const [microphone, setMicrophone] = useState<boolean>(true);
  const [speaker, setSpeaker] = useState<boolean>(true);
  const [mainPicture, setMainPicture] = useState<string>("ana");
  const [miniPicture, setMiniPicture] = useState<string>("joko");

  const toggleCamera = () => {
    setCamera(!camera);
  };

  const toggleMicrophone = () => {
    setMicrophone(!microphone);
  };

  const toggleSpeaker = () => {
    setSpeaker(!speaker);
  };

  const changeMainPicture = () => {
    const temp: string = mainPicture;
    setMainPicture(miniPicture);
    setMiniPicture(temp);
  };

  const switchCamera = (e: React.MouseEvent): void => {
    alert("switch camera yes");
    e.stopPropagation();
  };

  // Check user's device
  let mobileRegex: RegExp =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;
  let isMobile: boolean = mobileRegex.test(window.navigator.userAgent);

  return (
    <div className="w-full h-full bg-orange-100 flex flex-col rounded-lg gap-3">
      {/* Camera */}
      <div className="w-[97%] h-[90%] bg-amber-50 m-auto mt-4 rounded-2xl relative flex">
        {/* Mini Camera */}
        <div
          className="w-[20%] h-[20%] bg-orange-100 absolute rounded-2xl m-3 right-0 hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:bg-stone-950 hover:before:opacity-25 hover:before:rounded-2xl transition-colors duration-200 "
          onClick={changeMainPicture}
        >
          {isMobile && (
            <div className="relative w-full h-full group">
              <button
                className="hover:cursor-pointer p-2 text-lg absolute right-0 bottom-0 bg-amber-50"
                onClick={switchCamera}
              >
                <LuSwitchCamera></LuSwitchCamera>
              </button>
            </div>
          )}
          <p className=" text-lg absolute top-12 right-20">{miniPicture}</p>
        </div>
        <p className="m-auto text-2xl">{mainPicture}</p>
      </div>
      {/* Button Bar */}
      <div className="w-fit h-[10%] bg-amber-50 mx-auto rounded-2xl mb-4 flex gap-10 justify-center p-2">
        <MicrophoneButton
          state={microphone}
          toggleMicrophone={toggleMicrophone}
        ></MicrophoneButton>
        <CameraButton state={camera} toggleCamera={toggleCamera}></CameraButton>
        <SpeakerButton
          state={speaker}
          toggleSpeaker={toggleSpeaker}
        ></SpeakerButton>
      </div>
    </div>
  );
}
