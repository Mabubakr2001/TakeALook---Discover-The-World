import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":continentID/:countryID" element={<CountryDetails />} />
    </Routes>
  )
}

export default App
