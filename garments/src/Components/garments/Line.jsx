import { useContext } from 'react';
import Garments from '../../Contexts/Garments';

function Line({ garment }) {

    const { setDeleteData, setModalData } = useContext(Garments);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {garment.image ? <div className='img-bin'>
                            <img src={garment.image} alt={garment.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        <h1>{garment.type}</h1>
                    </div>
                    <div className="line__content__info" style={{color: garment.color}}>
                        Color: {garment.color}
                    </div>
                    <div className="line__content__info">
                        Size: {garment.size}
                    </div>
                    <div className="line__content__info">
                        Price: {garment.price} EUR
                    </div>
                    
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(garment)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(garment)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;