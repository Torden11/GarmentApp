import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import Garments from "../../Contexts/Garments";
import getBase64 from "../../Functions/getBase64";

function Create() {
  const [type, setType] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const fileInput = useRef();

  const { setCreateData } = useContext(Garments);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (type.length === 0 || type.length > 50) {
      makeMsg("Invalid type", "error");
      return;
    }
    if (price.replace(/[^\d.]/, "") !== price) {
      makeMsg("Invalid price", "error");
      return;
    }
    if (parseFloat(price) > 599.99) {
      makeMsg("Max price is 599.99", "error");
      return;
    }
    setCreateData({
      type,
      color,
      size,
      price: parseFloat(price),
      image: photoPrint,
    });
    setType("");
    setSize("");
    setColor("#ffffff");
    setPrice("");
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="mx-auto card m-4 col-lg-4 col-md-12">
      <h5 className="card-header">New Garment</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Garment Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Garment Color</label>
          <input
            type="color"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Garment Size</label>
          <select
            className="form-select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value={0}>Choose from list</option>
            {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((dydis, i) => (
              <option key={i} value={dydis}>
                {dydis}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Garment Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Garment Image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
