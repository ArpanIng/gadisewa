import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    localStorage.clear();
    return <Navigate to="/login" />;
  };

  return (
    <>
      <p>what up {currentUser ? "true" : "false"}</p>
      <button onClick={() => toast("This is a simple toast.")}>
        Show Toast
      </button>{" "}
      <Toaster position="top-right" gutter={5} />
    </>
  );
}

export default App;
