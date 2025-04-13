import Button from "../navigation/Button";
import { useNavigate } from "react-router";
import { useState } from "react";

const Country = ({continentID, id, name, currency, image, description}) => {
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!isExpanded) {
    description = `${description.substring(0, 300)}...`;
  }

  function ToCountryDetailsHandler() {
    navigate(`/${continentID}/${id}`)
  }

  return (
    <div className="country">
      <div className="country-info">
        <h2>{name}</h2>
        <h2>Currency {currency}</h2>
      </div>
      <img src={image} alt="Egypt" />
      <p>{description}<span className="manipulate-paragraph-spot" onClick={() => !isExpanded ? setExpanded(true) : setExpanded(false)}>{!isExpanded ? "More..." : "Less"}</span></p>
      <Button text="See More" type="more-info-btn" clickingOperation={ToCountryDetailsHandler}/>
    </div>
  )
}

export default Country