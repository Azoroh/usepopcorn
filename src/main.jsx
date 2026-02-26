import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// import StarRating from "./StarRating.jsx";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" onSetRating={setMovieRating} />
//       <p>the has rating of {movieRating} stars</p>
//     </div>
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={7} />

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
      defaultRating={4}
    /> */}
    ,{/* <Test /> */}
  </StrictMode>,
);
