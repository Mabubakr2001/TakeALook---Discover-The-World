const City = ({name, nickname, image, description, foods}) => {
  return (
    <div className="city">
      <div className="city-head">
        <h1>{name}</h1>
        <h3>{nickname}</h3>
      </div>
      <img src={image} alt="London Image" className="city-image"/>
      <p>{description}</p>
      <div className="city-foods">
        {foods.map(food => <span className="city-food">{food}</span>)}
      </div>
    </div>
  )
}

export default City