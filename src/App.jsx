import Logo from "./assets/images/logo.png";
import NavBar from "./components/navigation/NavBar";
import Continent from "./components/continent/Continent";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import './index.css';

function App() {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadContinents() {
      try {
        const continentsRef = collection(db, "continents");
        const continentsSnapshot = await getDocs(continentsRef);
        if (continentsSnapshot.empty) {
          console.error("No continents found!");
          return [];
        }
        const continents = continentsSnapshot.docs.map((continent) => {
          return { id: continent.id, ...continent.data() };
        });
        if (isMounted) {
          setContinents(continents);
        }
      } catch (error) {
        console.error(`Error while fetching continents: ${error}`);
        return [];
      }
    }
    loadContinents();
    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <>
      <img src={Logo} alt="Take A Look" className="logo"/>
      <NavBar />
      {continents.map(continent => <Continent key={continent.id} id={continent.id} continentArea={continent.area} continentName={continent.name}/>)}
    </>
  )
}

export default App
