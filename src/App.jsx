import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
