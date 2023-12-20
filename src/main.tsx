import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/kanit/400.css"; // regular
import "@fontsource/kanit/600.css"; // semi-bold
import "./index.css";
import Modal from "./modal/Modal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Modal>
      <App />
    </Modal>
  </React.StrictMode>
);
