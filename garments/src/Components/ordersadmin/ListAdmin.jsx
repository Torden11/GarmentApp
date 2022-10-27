import { useContext, useState, useEffect } from 'react';
import Order from "../../Contexts/Order";
import Line from './LineAdmin';


function List() {

    const { garments } = useContext(Order);
    const [orderSum, setOrderSum] = useState({ sum: null });
    
    

    useEffect(() => {
        if (null === garments) {
            return;
        }
        setOrderSum(o => ({ ...o, sum: garments.reduce((a, b) => (a + b.price), 0) }));
    }, [garments]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Orders List (Total {orderSum.sum} EUR)</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        garments?.map(g => <Line key={g.cid} garment={g} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;