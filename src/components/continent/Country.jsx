import Button from "../navigation/Button";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

async function fetchCountry(continentId, countryID) {
  try {
    const countryRef = doc(
      db,
      `continents/${continentId}/countries/${countryID}`
    );
    const docSnapshot = await getDoc(countryRef);
    if (!docSnapshot.exists()) {
      console.error("No country found!");
      return null;
    }
    const country = docSnapshot.data();
    return country;
  } catch (error) {
    console.error(`Error while fetching countries: ${error}`);
    return null;
  }
}

const Country = ({id, name, currency, image, description}) => {
  const [isExpanded, setExpanded] = useState(false);

  if (!isExpanded) {
    description = `${description.substring(0, 300)}...`;
  }

  return (
    <div className="country" id={id}>
      <div className="country-info">
        <h2>{name}</h2>
        <h2>Currency {currency}</h2>
      </div>
      <img src={image} alt="Egypt" />
      <p>{description}<span className="manipulate-paragraph-spot" onClick={() => !isExpanded ? setExpanded(true) : setExpanded(false)}>{!isExpanded ? "More..." : "Less"}</span></p>
      <div className="country-btns">
        <Button text="Add To Favorites"/>
        <Button text="See More"/>
      </div>
    </div>
  )
}

export default Country