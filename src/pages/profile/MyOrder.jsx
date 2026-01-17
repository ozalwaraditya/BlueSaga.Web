import TableComponent from "../../components/table/TableComponent";
import { coupon_api, order_api } from "../../utility/url";
import { useAuth } from "../../hooks/useAuth.jsx";

function MyOrders() {
  const columns = ["Order Id", "Order Placer", "Phone Number", "₹Total Amount"];
  const columnTableIndex = [0, 3, 4, 6];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <TableComponent
      entityName="Order"
      url={`${order_api}/api/order/my-order?userId=${currentUser.userId}`}
      deleteUrl={order_api + "/api/order"}
      columns={columns}
      columnTableIndex={columnTableIndex}
      pageSize={15}
      addButtonNavigatePath="/my-orders/details"
      showActionButton={false}
      showOrderActions={true}
    />
  );
}

export default MyOrders;
