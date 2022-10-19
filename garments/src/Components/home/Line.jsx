// import { useContext } from 'react';
// import Home from '../../Contexts/Home';

// import { useState } from "react";

function Line({ garment }) {
    

    // const { setRateData, setComment } = useContext(Home);

    // const [rate, setRate] = useState(5);
    // const [post, setPost] = useState('');

    // const doRating = () => {
    //     setRateData({
    //         id: garment[1][0].id,
    //         rate
    //     });
    //     setRate(5);
    // }

    // const add = () => {
    //     setComment({
    //         post,
    //         garment_id: garment[1][0].id
    //     });
    //     setPost('');
    // };

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
                    Price: {garment.price} Eur
                    </div>

                    {/* <div className="home__content__info">
                    <h2>Movie Rating: {garment[1][0].rating ?? 'no rating'}</h2>
                        <select value={rate} onChange={e => setRate(e.target.value)}>
                            {
                                [...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
                            }
                        </select>
                    </div> */}
                    {/* <div className="home__buttons">
                        <button onClick={doRating} type="button" className="btn btn-outline-success">Rate</button>
                    </div> */}
                </div>
            </div>
            {/* <div className="comments">

                <ul className="list-group">
                    {
                        garment[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
                    }
                </ul>

                <div className="mb-3">
                    <label className="form-label">Add comment</label>
                    <textarea className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div> */}
        </li>
    )
}

export default Line;