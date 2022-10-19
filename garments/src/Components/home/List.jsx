import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Home from "../../Contexts/Home";
import Line from './Line';

const sortData = [
    { v: 'default', t: 'Default' },
    { v: 'price_asc', t: 'Price 1-9' },
    { v: 'price_desc', t: 'Price 9-1' },
    { v: 'rate_asc', t: 'Type A-Z' },
    { v: 'rate_desc', t: 'Type Z-A' }
];

function List() {

    const { garments, setGarments } = useContext(Home);

    const [sortBy, setSortBy] = useState('default');
    const [stats, setStats] = useState({garmentCount: null});

    

    useEffect(() => {
        if (null === garments) {
            return;
        }
        setStats(s => ({...s, garmentCount: garments.length}));
    }, [garments]);

    useEffect(() => {
        switch (sortBy) {
            case 'price_asc':
                setGarments(m => [...m].sort((a, b) => a.price - b.price));
                break;
            case 'price_desc':
                setGarments(m => [...m].sort((b, a) => a.price - b.price));
                break;
            case 'rate_asc':
                setGarments(m => [...m].sort((x, c) => x.type.localeCompare(c.type)));
                break;
            case 'rate_desc':
                setGarments(m => [...m].sort((jo, no) => no.type.localeCompare(jo.type)));
                break;
            default:
                setGarments(m => [...m ?? []].sort((a, b) => a.row - b.row));
        }

    }, [sortBy, setGarments]);

    return (
        <>
            <div className="card m-4">
                <h5 className="card-header">Sort</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Sort By</label>
                        <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            {
                                sortData.map(c => <option key={c.v} value={c.v}>{c.t}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="card m-4">
                <h5 className="card-header">Garments List ({stats.garmentCount})</h5>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            garments?.map(g => <Line key={g.id} garment={g} />)
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default List;