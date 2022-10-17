import { useContext } from 'react';
import Garments from "../../Contexts/Garments";
import Line from './Line';

function List() {

    const { garments } = useContext(Garments);

    return (
        <div className="card m-4">
            <h5 className="card-header">Garments List</h5>
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