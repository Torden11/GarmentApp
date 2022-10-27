import Order from "../../Contexts/Order";
import List from "./ListAdmin";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import DataContext from "../../Contexts/DataContext";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [garments, setGarments] = useState(null);
  const [order, setOrder] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const { makeMsg } = useContext(DataContext);

  console.log(order)

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/garments/noorders/", authConfig())
      .then((res) => {
        setGarments(res.data);
      });
  }, [lastUpdate]);

  //APPROVE (EDIT) an order
  useEffect(() => {
    if (order === null) {
      return;
    }
    console.log(order)
    axios
      .put(
        "http://localhost:3003/server/orders/" + order.id, order, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
        makeMsg(res.data.text, res.data.type);
      });
  }, [order, makeMsg]);

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete("http://localhost:3003/server/orders/" + deleteData.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
        makeMsg(res.data.text, res.data.type);
      });
  }, [deleteData, makeMsg]);

  return (
    <Order.Provider
      value={{
        setOrder,
        garments,
        setDeleteData
      }}
    >
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
