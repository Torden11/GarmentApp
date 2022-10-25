import Order from "../../Contexts/Order";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [garments, setGarments] = useState(null);
    const [order, setOrder] = useState(null);
    const { makeMsg } = useContext(DataContext);

    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/garments/noorders', authConfig())
            .then(res => {
                setGarments(reList(res.data));
            })
    }, [lastUpdate]);

    useEffect(() => {
        if (null === order) {
            return;
        }
        axios.delete('http://localhost:3003/server/orders/' + order.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
    }, [order, makeMsg]);

    return (
        <Order.Provider value={{
            setOrder,
            garments
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Order.Provider>
    );
}

export default Main;