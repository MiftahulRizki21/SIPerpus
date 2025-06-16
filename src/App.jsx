console.log("Rendering Notes...");

import { createRoot } from "react-dom/client";
import React from "react";
import './assets/tailwind.css';

export default function App(){
    return(
        <Suspense fallback={<Loading/>}>
            
        </Suspense>
    )
}
    

    