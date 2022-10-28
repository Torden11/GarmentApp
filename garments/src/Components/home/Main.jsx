import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

function Main() {
  const [garments, setGarments] = useState(null);
  const [order, setOrder] = useState(null);
  const { makeMsg } = useContext(DataContext);

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/garments", authConfig())
      .then((res) => {
        setGarments(res.data.map((d, i) => ({ ...d, show: true, row: i })));
      });
  }, [makeMsg]);

  useEffect(() => {
    if (null === order) {
      return;
    }
    axios
      .post("http://localhost:3003/orders", order, authConfig())
      .then((res) => {
        makeMsg(res.data.text, res.data.type);
      });
  }, [order, makeMsg]);

  return (
    <Home.Provider
      value={{
        garments,
        setGarments,
        setOrder,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </Home.Provider>
  );
}

export default Main;
