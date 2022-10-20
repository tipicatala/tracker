import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./routes/Login";
import Initial from "./routes/Initial";
import Daily from "./routes/Daily";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/initial" element={<Initial />} />
        <Route path="/daily" element={<Daily />} />
      </Routes>
    </Router>
  );
}

export default App;
