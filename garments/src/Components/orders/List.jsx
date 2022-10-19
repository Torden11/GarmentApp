import { useContext } from 'react';
import Order from "../../Contexts/Order";
import Line from './Line';


function List() {

    const { garments } = useContext(Order);
    // const [stats, setStats] = useState({ garmentCount: null });


    // useEffect(() => {
    //     if (null === garments) {
    //         return;
    //     }
    //     setStats(s => ({ ...s, garmentCount: garments.length }));
    // }, [garments]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Orders List</h5>
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