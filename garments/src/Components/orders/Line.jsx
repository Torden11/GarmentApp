import { useContext } from 'react';
import Order from '../../Contexts/Order';

function Line({ garment }) {

    const { setOrder } = useContext(Order);

    const remove = id => {
        setOrder({id});
    }
console.log(garment)
    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{garment[1][0].type}</h1>
                        {garment[1][4].image ? <div className='img-bin'>
                            <img src={garment[1][4].image} alt={garment.image}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        {garment[1][0].price} Eur
                    </div>
                </div>
            </div>
            {/* <div className="comments">
                <ul className="list-group">
                    {
                         garment[1]?.map(g => g.cid !== null ? <li key={g.cid} className="list-group-item">
                            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{garment[1][0].type}</h1>
                        {garment[1][0].image ? <div className='img-bin'>
                            <img src={garment[1][0].image} alt={garment[1][0].image}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        {garment[1][0].price} Eur
                    </div>
                </div>
            </div> 
                            <div className="home__buttons">
                                <button onClick={() => remove(g.cid)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div>
                        </li> : null)
                    }
                </ul>
            </div> */}
        </li>
    )
}

export default Line;