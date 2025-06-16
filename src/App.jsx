console.log("Rendering Notes...");

import { createRoot } from "react-dom/client";
import React from "react";
import './assets/tailwind.css';
import Header from "./layouts/Header";
import Home from "./pages/Home";

export default function App(){
    return(
        <div>
            <Home/>
        </div>
    )
}
    

    