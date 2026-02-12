import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'

import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRange={7} />
  </StrictMode>,
);
