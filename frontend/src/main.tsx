import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import App from "./App.tsx";
import { Chat } from "./pages/Chat.tsx";
import { VideoCall } from "./pages/VideoCall.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { StorageProvider } from "./contexts/StorageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StorageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route
            path="/chat"
            element={
              <div className="bg-orange-50 h-screen sm:px-20 sm:py-10 md:px-70 md:py-20 justify-center">
                <div className="h-full w-full">
                  <Chat></Chat>
                </div>
              </div>
            }
          ></Route>
          <Route
            path="/video-call"
            element={
              <div className="bg-orange-50 h-screen sm:px-20 sm:py-10 md:px-70 md:py-20 justify-center">
                <div className="h-full w-full">
                  <VideoCall></VideoCall>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </StorageProvider>
  </AuthProvider>
);
