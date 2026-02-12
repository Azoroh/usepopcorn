import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'

import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={7} />

    <StarRating
      maxRating={5}
      size={40}
      color="green"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />

    <StarRating
      maxRating={5}
      size={24}
      color="red"
      className="test"
      defaultRating={3}
    />
  </StrictMode>,
);
