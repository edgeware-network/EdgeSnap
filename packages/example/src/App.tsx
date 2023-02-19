import React from "react";
import { Dashboard } from "./containers/Dashboard/Dashboard";
import { MetaMaskContextProvider } from "./context/metamask";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Extrinsics from "./containers/Extrinsics/Extrinsics";
import Tools from "./containers/Tools/Tools";

function App() {

  return (
    <Router>
      <MetaMaskContextProvider>
        <Navbar />
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Extrinsics" element={<Extrinsics />} />
          <Route path="/Tools" element={<Tools />} />
        </Routes>
      </MetaMaskContextProvider>
    </Router>

  );
}

export default App;
