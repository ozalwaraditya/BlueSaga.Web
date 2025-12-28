import TableComponent from "../../components/table/TableComponent";
import { product_api } from "../../utility/url";

function InventoryManagment() {
  const columns = ["Product Name", "Stock Quantity", "Reserved Stock"];
  const columnTableIndex = [2, 4, 3];
  return (
    <>
      <TableComponent
        entityName="Inventory"
        url={product_api + "/inventory"}
        columns={columns}
        columnTableIndex={columnTableIndex}
        pageSize={15}
        showActionButton={false}
      />
    </>
  );
}

export default InventoryManagment;
