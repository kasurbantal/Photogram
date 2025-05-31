import type React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
