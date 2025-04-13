import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import City from "../components/city/City";
import { db } from "../firebase";

const CountryDetails = () => {
  const [cities, setCities] = useState([]);
  const {continentID, countryID} = useParams();

  useEffect(() => {
    let isMounted = true;
    async function loadCities() {
      try{
        const citiesRef = collection(db, `continents/${continentID}/countries/${countryID}/cities`);
        const citiesSnapshot = await getDocs(citiesRef);
        if (citiesSnapshot.empty) {
          console.error("No cities found!");
          return [];
        }
        const allCities = citiesSnapshot.docs.map((city) => {
          return { id: city.id, ...city.data() };
        });
        if (isMounted) {
          setCities(allCities);
        }
      } catch (error) {
        console.error(`Error while fetching cities: ${error}`);
        return [];
      }
    }
    loadCities();
    return () => {
      isMounted = false;
    }
  }, [continentID, countryID])


  return (
    cities.map(city => <City name={city.name} nickname={city.nickname} image={city.image} description={city.description} foods={city.foods}/>)
  )
}

export default CountryDetails