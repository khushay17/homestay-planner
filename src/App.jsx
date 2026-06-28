import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PlanTrip from "./pages/PlanTrip";
import Itinerary from "./pages/Itinerary";
import Homestays from "./pages/Homestays";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("");
  const [tripData, setTripData] = useState(null);

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
    return (
      <About
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if (page === "planTrip") {
    return (
      <PlanTrip
        user={user}
        onLogout={() => {
          setUser("");
          setPage("home");
        }}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
        onGenerate={(trip) => {
          setTripData(trip);
          setPage("itinerary");
        }}
      />
    );
  }

  if (page === "itinerary") {
    return (
      <Itinerary
        user={user}
        trip={tripData}
        onLogout={() => {
          setUser("");
          setPage("home");
        }}
        onAbout={() => setPage("about")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if(page==="homestays"){
  return(
    <Homestays
      user={user}
      onLogout={()=>{
        setUser("");
        setPage("home");
      }}
      onAbout={()=>setPage("about")}
      onBack={()=>setPage("dashboard")}
    />
  );
}
return(
 <Dashboard
  user={user}
  onLogout={()=>{
    setUser("");
    setPage("home");
  }}
  onAbout={()=>setPage("about")}
  onPlanTrip={()=>setPage("planTrip")}
  onHomestays={()=>setPage("homestays")}
/>
);
}



export default App;