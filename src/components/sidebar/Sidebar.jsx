import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    AddShoppingCart,
    AssignmentTurnedIn,
    ListAlt,
    ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../redux/userRedux";

export default function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        // Update cart
        dispatch(logout());
        history.push("/");
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/home" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <Link to="/newproduct" className="link">
                            <li className="sidebarListItem">
                                <AddShoppingCart className="sidebarIcon" />
                                Add Product
                            </li>
                        </Link>
                        <Link to="/verifikasi" className="link">
                            <li className="sidebarListItem">
                                <AssignmentTurnedIn className="sidebarIcon" />
                                Verifikasi
                            </li>
                        </Link>
                        <Link to="/penjualan" className="link">
                            <li className="sidebarListItem">
                                <ListAlt className="sidebarIcon" />
                                Data Penjualan
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Data Product
                            </li>
                        </Link>
                        <li className="sidebarListItem" onClick={handleLogout}>
                            <ExitToApp className="sidebarIcon" />
                            Logout
                        </li>
                    </ul>
                </div>
                {/* <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon" />
                            Transactions
                        </li>
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon" />
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}
