import { useState } from "react";
import "./newProduct.css";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.product);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = {
                        ...inputs,
                        img: downloadURL,
                        categories: cat,
                    };
                    addProduct(product, dispatch, toast);
                });
            }
        );
    };

    return (
        <div className="newProduct">
            <div className="wrapper">
                <h1 className="addProductTitle">New Product</h1>
                <div className="inner-wrapper">
                    <form className="addProductForm">
                        <div className="addProductItem">
                            <label>Image</label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Username Seller</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="elonmusk123"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Title</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Kaos Uniqlo"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Description</label>
                            <input
                                name="desc"
                                type="text"
                                placeholder="description..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Warna</label>
                            <input
                                name="color"
                                type="text"
                                placeholder="Yellow"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Size</label>
                            <input
                                name="size"
                                type="text"
                                placeholder="M"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Categories</label>
                            <input
                                name="categories"
                                type="text"
                                placeholder="jeans,woman"
                                onChange={handleCat}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="100"
                                onChange={handleChange}
                            />
                        </div>
                        {/* <div className="addProductItem">
                    <label>Stock</label>
                    <select name="" id="" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div> */}
                        {/* <div className="addProductItem">
                            <label>Status</label>
                            <select
                                name="status"
                                id="name"
                                onChange={handleChange}
                            >
                                <option value="pending">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div> */}
                        <button
                            onClick={handleClick}
                            className="addProductButton"
                            disabled={isFetching}
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-center" />
        </div>
    );
}
