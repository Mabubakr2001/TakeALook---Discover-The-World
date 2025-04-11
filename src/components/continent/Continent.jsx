import Country from "./Country";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Continent = ({id, continentArea, continentName}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadCountries() {
      try {
        const countriesRef = collection(db, `continents/${id}/countries`);
        const countriesSnapshot = await getDocs(countriesRef);
        if (countriesSnapshot.empty) {
          console.error("No countries found!");
          return [];
        }
        const countries = countriesSnapshot.docs.map((country) => {
          return { id: country.id, ...country.data() };
        });
        if (isMounted) {
          setCountries(countries);
        }
      } catch (error) {
        console.error(`Error while fetching countries: ${error}`);
        return [];
      }
    }
    loadCountries();
    return () => {
      isMounted = false;
    }
  }, [id])

  return (
    <div className="continent" id={id}>
      <h1>{continentName}</h1>
      <h3>{continentArea}</h3>
      <div className="discover-countries">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#000" d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"/></svg>
        {countries.map(country => <Country key={country.id} id={country.id} name={country.name} currency={country.currency} image={country.image} description={country.description}/>)}
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#000" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"/></svg>
      </div>
    </div>
  )
}

export default Continent