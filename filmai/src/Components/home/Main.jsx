import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Main() {

        const [lastUpdate, setLastUpdate] = useState(Date.now());
        const [movies, setMovies] = useState(null);
        const [rateData, setRateData] = useState(null);
        const [comment, setComment] = useState(null);

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
            axios.get('http://localhost:3003/home/movies', authConfig())
                .then(res => {
                    setMovies(reList(res.data));
                })
        }, [lastUpdate]);

        useEffect(() => {
            if (null === comment) {
                return;
            }
            axios.post('http://localhost:3003/home/comments/' + comment.movie_id, comment, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
            })
         }, [comment]);


        useEffect(() => {
            if (null === rateData) {
                return;
            }
            axios.put('http://localhost:3003/home/movies/' + rateData.id, rateData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
            });
        }, [rateData]);

      return (
        <Home.Provider value={{
            movies,
            setRateData,
            setMovies,
            setComment
        }}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <List/>
                </div>
            </div>
        </div>
        </Home.Provider>
    );
}

export default Main;