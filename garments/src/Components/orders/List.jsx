import { useContext, useState, useEffect } from 'react';
import Order from "../../Contexts/Order";
import Line from './Line';


function List() {

    const { garments } = useContext(Order);
    const [orderSum, setOrderSum] = useState({ sum: null });
    console.log(garments)
    

    useEffect(() => {
        if (null === garments) {
            return;
        }
        setOrderSum(o => ({ ...o, sum: garments.reduce((a, b) => (a.price + b.price)) }));
    }, [garments]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Orders List ({orderSum.sum})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        garments?.map(g => <Line key={g.id} garment={g} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;