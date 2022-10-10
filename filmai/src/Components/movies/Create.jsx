import { useState, useContext, useRef } from 'react';
import Movies from '../../Contexts/Movies';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(Movies);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {
        setCreateData({
            title,
            price: parseFloat(price),
            image: photoPrint
        });
        setTitle('');
        setPrice('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">New Movie</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Movie title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Movie Price</label>
                    <input type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Movie Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;