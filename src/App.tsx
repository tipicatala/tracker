import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Initial from "./routes/Initial";
import DailySelect from "./routes/DailySelect";
import DailyDrag from "./routes/DailyDrag";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/initial" element={<Initial />} />
        <Route path="/daily-select" element={<DailySelect />} />
        <Route path="/daily-drag" element={<DailyDrag />} />
      </Routes>
    </Router>
  );
}

export default App;
