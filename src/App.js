import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-[#FFFCFB]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
