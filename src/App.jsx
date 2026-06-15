import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("");

  if (page === "home") {
    return (
      <Home
        onGetStarted={() => setPage("login")}
      />
    );
  }

  if (page === "login") {
    return (
      <Login
        onLogin={(email) => {
          setUser(email);
          setPage("dashboard");
        }}
      />
    );
  }
  if (page === "about") {
  return <About onBack={() => setPage("dashboard")} />;
}

return (
  <Dashboard
    user={user}
    onLogout={() => {
      setUser("");
      setPage("home");
    }}
    onAbout={() => setPage("about")}
  />
);
}

export default App;