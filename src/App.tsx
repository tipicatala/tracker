import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./routes/Login";
import Initial from "./routes/Initial";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/initial" element={<Initial />} />
      </Routes>
    </Router>
  );
}

export default App;
