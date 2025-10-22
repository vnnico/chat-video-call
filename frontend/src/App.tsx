import { VideoCall } from "./pages/VideoCall";

function App() {
  return (
    <div className="bg-orange-50 h-screen sm:px-20 sm:py-10 md:px-70 md:py-20 justify-center">
      <div className="h-full w-full">
        {/* <Chat></Chat> */}
        <VideoCall></VideoCall>
      </div>
    </div>
  );
}

export default App;
