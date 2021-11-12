import { useState } from "react";
import "./orderCard.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import NumberFormat from "react-number-format";
import { Receipt } from "@material-ui/icons";

const OrderCard = ({ item }) => {
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState("");
    const productsId = item.products;
    const userId = item.userId;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get("/products");
                setProducts(res.data);
            } catch (err) {}
        };
        getProducts();
    }, []);

    useEffect(() => {
        const getUsername = async () => {
            try {
                const res = await userRequest.get(`/users/find/${userId}`);
                setUsername(res.data.username);
            } catch (err) {}
        };
        getUsername();
    }, []);

    const product = products.filter((p) => productsId.includes(p._id));

    const handleVerif = (id) => {
        const orderId = id;
        const VerifOrder = async (product, dispatch) => {
            try {
                const res = await userRequest.put(
                    `/orders/verifikasi/${orderId}`
                );
            } catch (err) {}
        };
        VerifOrder();
    };

    return (
        <div className="verifCard">
            <div className="username">{username}</div>
            <div className="products">
                {product.map((product) => (
                    <div className="productContainer" key={product._id}>
                        <div className="productTitle">{product.title} </div>
                        <div className="productPrice">
                            <NumberFormat
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp"}
                            />
                        </div>
                    </div>
                ))}
                <div className="subtotalContainer">
                    <div className=""></div>
                    <div className="title">Total</div>
                    <div className="subtotal">
                        <NumberFormat
                            value={item.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                        />
                    </div>
                </div>
            </div>
            <div className="right">
                <a href={item.img} target="_blank">
                    <div className="bukti">
                        <Receipt /> Check Bukti Pembayaran
                    </div>
                </a>
                <button
                    className="verifButton"
                    onClick={() => handleVerif(item._id)}
                >
                    Verifikasi
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
