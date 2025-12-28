import TableComponent from "../../components/table/TableComponent";
import { product_api } from "../../utility/url";

function CategoryManagement() {
  const columns = ["Category Name"];
  const columnTableIndex = [1];
  return (
    <>
      <TableComponent
        entityName="Category"
        url={product_api + "/api/Category/GetPaginatedCategories"}
        columns={columns}
        columnTableIndex={columnTableIndex}
        pageSize={15}
        addButtonNavigatePath={"/management/category-form"}
      />
    </>
  );
}

export default CategoryManagement;
