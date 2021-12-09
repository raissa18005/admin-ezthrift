import { useEffect, useState } from "react";
import "./penjualan.css";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import PenjualanCard from "../../components/penjualanCard/PenjualanCard";

export default function Penjualan() {
    const user = useSelector((state) => state.user.currentUser);
    const userId = user.others._id;
    const [orders, setOrders] = useState([]);
    const status = ["Terverifikasi", "sending"];

    // useEffect(() => {
    //     const getAllOrders = async () => {
    //         try {
    //             const res = await userRequest.get(`/orders/penjualan`);
    //             setOrders(res.data);
    //         } catch (err) {}
    //     };
    //     getAllOrders();
    // }, []);

    const penjualanOrders = orders.filter((p) => status.includes(p.status));
    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const res = await userRequest.get(`/orders`);
                setOrders(res.data);
            } catch (err) {}
        };
        getAllOrders();
    }, [penjualanOrders]);

    return (
        <div className="newProduct">
            <div className="wrapper">
                <h1 className="addProductTitle">Data Penjualan</h1>
                {penjualanOrders.map((item) => (
                    <PenjualanCard item={item} key={item._id} />
                ))}
            </div>
        </div>
    );
}
