import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AppProvider from "./context/AppContext";
import ErrorToast from "./components/errorToast";

function App() {
  return (
    <>
      <AppProvider>
        <RouterProvider router={router} />
        <ErrorToast />
      </AppProvider>
    </>
  );
}

export default App;
