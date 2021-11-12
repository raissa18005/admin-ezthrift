import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { getProducts, updateProduct } from "../../redux/apiCalls";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
    const location = useLocation();
    const history = useHistory();
    const productId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );
    const products = useSelector((state) => state.product.products);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };

    // const productUpdate = { ...inputs };
    // console.log(productUpdate);
    // const handleClick = (e) => {
    //     updateProduct(productId, productUpdate, dispatch);
    // };

    const handleClick = (e) => {
        e.preventDefault();
        if (file) {
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
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            const productUpdate = {
                                ...inputs,
                                img: downloadURL,
                                // categories: cat,
                            };
                            updateProduct(productId, productUpdate, dispatch);
                            history.push("/products");
                        }
                    );
                }
            );
        } else {
            const productUpdate = {
                ...inputs,
                // categories: cat,
            };
            updateProduct(productId, productUpdate, dispatch);
            history.push("/products");
        }

        console.log(product);
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            {/* <div className="productTop">
                <div className="productTopLeft">
                    <Chart
                        data={productData}
                        dataKey="Sales"
                        title="Sales Performance"
                    />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={product.img}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">
                                {product._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">status:</span>
                            <span className="productInfoValue">
                                {product.status}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">
                                {product.inStock}
                            </span>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder={product.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Product Description</label>
                        <input
                            type="text"
                            placeholder={product.desc}
                            name="desc"
                            onChange={handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="text"
                            placeholder={product.price}
                            name="price"
                            onChange={handleChange}
                        />
                        <label>Color</label>
                        <input
                            type="text"
                            placeholder={product.color}
                            name="color"
                            onChange={handleChange}
                        />
                        {/* <label>Category</label>
                        <input
                            type="text"
                            placeholder={product.categories}
                            name="categories"
                            onChange={handleCat}
                        /> */}
                        <label>Size</label>
                        <input
                            type="text"
                            placeholder={product.size}
                            name="size"
                            onChange={handleChange}
                        />
                        <label>Status</label>
                        <select
                            name="status"
                            id="status"
                            name="status"
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="selling">Selling</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={product.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="file">
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button className="productButton" onClick={handleClick}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
