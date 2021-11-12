import { useState } from "react";
import "./verifikasi.css";
import { useDispatch } from "react-redux";
import OrderCard from "../../components/orderCard/OrderCard";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function Verifikasi() {
    const user = useSelector((state) => state.user.currentUser);
    const userId = user.others._id;
    const [orders, setOrders] = useState([]);

    const pendingOrders = orders.filter((p) => p.status === "pending");

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const res = await userRequest.get(`/orders`);
                setOrders(res.data);
            } catch (err) {}
        };
        getAllOrders();
    }, [pendingOrders]);

    return (
        <div className="newProduct">
            <div className="wrapper">
                <h1 className="addProductTitle">Verifikasi</h1>
                {pendingOrders.map((item) => (
                    <OrderCard item={item} key={item._id} />
                ))}
            </div>
        </div>
    );
}
