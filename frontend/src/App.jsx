import { Button } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;