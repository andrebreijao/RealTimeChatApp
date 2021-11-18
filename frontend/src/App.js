import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import InitialPage from './pages/InitialPage'
import Chat from './pages/Chat'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes >
    </Router>
  );
}
