import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import Navbar from "./partials/Navbar";

function App() {
  return (
    <>
      <SignUpPage />
      <LoginPage />
      <Navbar />
    </>
  );
}

export default App;
