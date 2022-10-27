import { useContext } from "react";
import Order from "../../Contexts/Order";

function Line({ garment }) {
  const { setOrder, setDeleteData } = useContext(Order);
  

  const confirm = (id) => {
    setOrder({ 
      id,
      order_confirmed: 1
    });console.log(id)
  };

  const remove = (id) => {
    setDeleteData({ id });
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
          <div className="home__content__price">{garment.price} Eur</div>
        </div>
      </div>
      <div className="home__content__info">
                {garment.order_confirmed === 0 ?(
                  <div>Unaproved</div>
                ) : (
                  <div style={{ color: "green" }}>Approved</div>
                )}
              </div>
      <div className="home__buttons">
        <button
          onClick={() => confirm(garment.cid)}
          type="button"
          className="btn btn-outline-success"
        >
          Confirm
        </button>
        <button
          onClick={() => remove(garment.cid)}
          type="button"
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
      
    </li>
  );
}

export default Line;
