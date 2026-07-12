import { useEffect, useState } from "react";

import Signup from "./pages/Signup";
import MyTrips from "./pages/MyTrips";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PlanTrip from "./pages/PlanTrip";
import Itinerary from "./pages/Itinerary";
import Homestays from "./pages/Homestays";

function App() {
  const [page, setPage] = useState("home");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        return JSON.parse(savedUser).name || "";
      } catch {
        return "";
      }
    }

    return "";
  });

  const [tripData, setTripData] = useState(null);

  // HANDLE GOOGLE OAUTH REDIRECT
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token && name && email) {
      const userData = {
        name,
        email,
      };

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(name);
      setPage("dashboard");

      // Remove token from browser URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, []);

  // CHECK JWT
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  // NORMAL LOGIN
  const handleLogin = (userData) => {
    setUser(userData.name);
    setPage("dashboard");
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser("");
    setPage("home");
  };

  // HOME
  if (page === "home") {
    return (
      <Home
        onGetStarted={() => setPage("signup")}
      />
    );
  }

  // SIGNUP
  if (page === "signup") {
    return (
      <Signup
        onSignup={() => setPage("login")}
        onLogin={() => setPage("login")}
      />
    );
  }

  // LOGIN
  if (page === "login") {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // ABOUT
  if (page === "about") {
    return (
      <About
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // PLAN TRIP
  if (page === "planTrip") {
    return (
      <PlanTrip
        user={user}
        onLogout={handleLogout}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
        onGenerate={(trip) => {
          setTripData(trip);
          setPage("itinerary");
        }}
      />
    );
  }

  // ITINERARY
  if (page === "itinerary") {
    return (
      <Itinerary
        user={user}
        trip={tripData}
        onLogout={handleLogout}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // HOMESTAYS
  if (page === "homestays") {
    return (
      <Homestays
        user={user}
        onLogout={handleLogout}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // PROTECTED PAGE 1: MY TRIPS
  if (page === "myTrips") {
    if (!isAuthenticated()) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <MyTrips
        user={user}
        onLogout={handleLogout}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // PROTECTED PAGE 2: DASHBOARD
  if (page === "dashboard") {
    if (!isAuthenticated()) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <Dashboard
        user={user}
        onLogout={handleLogout}
        onAbout={() => setPage("about")}
        onPlanTrip={() => setPage("planTrip")}
        onHomestays={() => setPage("homestays")}
        onMyTrips={() => setPage("myTrips")}
      />
    );
  }

  // FALLBACK
  return (
    <Home
      onGetStarted={() => setPage("signup")}
    />
  );
}

export default App;