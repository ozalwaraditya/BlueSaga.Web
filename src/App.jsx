import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
