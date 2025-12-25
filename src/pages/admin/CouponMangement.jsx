import TableComponent from "../../components/table/TableComponent";
import { coupon_api } from "../../utility/url";

function CouponMangement() {
  const columns = ["Coupon Name", "Minimum Amount", "Discoupon Amount"];
  const columnTableIndex = [1, 2, 3];
  return (
    <>
      <TableComponent
        entityName="Coupon"
        url={coupon_api + "/api/CouponAPI"}
        columns={columns}
        columnTableIndex={columnTableIndex}
        pageSize={15}
      />
    </>
  );
}

export default CouponMangement;
