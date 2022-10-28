import { useContext } from "react";
import Home from "../../Contexts/Home";
import DataContext from "../../Contexts/DataContext";

function Line({ garment }) {
  const { setOrder } = useContext(Home);
  const { userId } = useContext(DataContext);

  //	order_confirmed: 0;	order_sum: garmet.price	garment_id: garment.id	user_id:1

  const add = () => {
    // console.log(userId)
    setOrder({
      order_confirmed: 0,
      order_sum: garment.price,
      garment_id: garment.id,
      user_id: userId,
    });
  };

  return (
    <li className="list-group-item">
      <div className="home">
        <div className="home__content">
          <div className="home__content__info">
            <h1>{garment.type}</h1>
            {garment.image ? (
              <div className="img-bin">
                <img src={garment.image} alt={garment.image}></img>
              </div>
            ) : null}
          </div>

          <div className="home__content__info" style={{ color: garment.color }}>
            Color: {garment.color}
          </div>
          <div className="home__content__info">Size: {garment.size}</div>
          <div className="home__content__price">Price: {garment.price} Eur</div>
          <div className="home__buttons">
            <button onClick={add} type="button" className="btn btn-outline-success">
              Add to Cart
            </button>
        </div>
      
      </div>
      </div>
    </li>
  );
}

export default Line;
