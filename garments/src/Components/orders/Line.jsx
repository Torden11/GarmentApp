import { useContext } from 'react';
import Order from '../../Contexts/Order';

function Line({ garment }) {

    const { setOrder } = useContext(Order);

    const remove = id => {
        setOrder({id});
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                    <h1>{garment.type}</h1>
                        {garment.image ? <div className='img-bin'>
                            <img src={garment.image} alt={garment.image}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        Size: {garment.size}
                    </div>
                    <div className="home__content__price">
                        {garment.price} Eur
                    </div>
                </div>
            </div>
            <div className="home__buttons">
                                <button onClick={() => remove(garment.cid)} type="button" className="btn btn-outline-danger">Delete</button>
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
                            
                        </li> : null)
                    }
                </ul>
            </div> */}
        </li>
    )
}

export default Line;