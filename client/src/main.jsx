import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <ChakraProvider>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ChakraProvider>
  </React.StrictMode>
);
