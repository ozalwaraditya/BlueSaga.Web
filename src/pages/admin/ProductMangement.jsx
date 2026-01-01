import TableComponent from "../../components/table/TableComponent";
import { product_api } from "../../utility/url";

function ProductMangement() {
  const columns = [ "Product Name", "Category", "Price"];
  // columnIndexMapping
  const columnTableIndex = [ 1, 4, 6];
  return (
    <>
      <TableComponent
        entityName="Products"
        url={product_api + "/api/Product/GetProducts"}
        columns={columns}
        columnTableIndex={columnTableIndex}
        pageSize={15}
        addButtonNavigatePath={"/management/products-form"}
      />
    </>
  );
}

export default ProductMangement;
