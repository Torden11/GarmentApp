import { useContext, useEffect, useState, useRef } from "react";
import Garments from "../../Contexts/Garments";
import getBase64 from "../../Functions/getBase64";

function Edit() {
  const [type, setType] = useState("");
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData } = useContext(Garments);

  const edit = () => {
    setEditData({
      type,
      color,
      size,
      price: parseFloat(price),
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    console.log(modalData)
    setType(modalData.type);
    setColor(modalData.color);
    setSize(modalData.size);
    setPrice(modalData.price);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Garment</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
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
                  {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(
                    (dydis, i) => (
                      <option key={i} value={dydis}>
                        {dydis}
                      </option>
                    )
                  )}
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
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
