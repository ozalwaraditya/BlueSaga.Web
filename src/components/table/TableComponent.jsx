import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./TableComponent.css";
import { useNavigate } from "react-router-dom";

function TableComponent({
  entityName,
  url,
  columns,
  columnTableIndex,
  pageSize,
  addButtonNavigatePath,
  showActionButton = true,
}) {
  const [items, setItems] = useState([]);
  const [objectColumnNames, setObjectColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();

  function handlePrevButton() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleNextButton() {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  }

  const fetchPaginatedData = async () => {
    const tablePromise = axios.get(url, {
      headers: { "Content-Type": "application/json" },
      params: { currentPage, pageSize },
      withCredentials: true,
    });

    toast.promise(tablePromise, {
      loading: "Fetching " + entityName + "...",
      success: (response) => {
        if (response.data.isSuccess) {
          console.log("Response data: ", response.data.response);
          const data = response.data.response;
          const currentItems = data.items;

          if (currentItems.length === 0) {
            setItems([]);
            setObjectColumnNames([]);
            setTotalPages(0);
            return "No " + entityName + " found";
          }

          setItems(currentItems);
          console.log("CurrentItems : ", currentItems);

          let cols = Object.keys(currentItems[0]);
          cols = columnTableIndex.map((i) => cols[i]);
          console.log("ObjectColumns : ", cols);
          setObjectColumnNames(cols);
          setTotalPages(Math.ceil(data.totalItems / pageSize));
          return "Done";
        }
        throw new Error(response.data.message);
      },
      error: (error) => {
        return (
          error.response?.data?.message || error.message || "Network Error"
        );
      },
    });

    try {
      await tablePromise;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedData();
  }, [currentPage]);

  // Calculate empty rows needed to fill the page
  const emptyRowsCount =
    items.length < pageSize && items.length > 0 ? pageSize - items.length : 0;

  return (
    <div className="content-management">
      <div className="management-header">
        <h2>{entityName} Management</h2>
        {showActionButton && (
          <button
            onClick={() => navigate(addButtonNavigatePath)}
            className="btn-add"
          >
            Add New {entityName}
          </button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Sr.No</th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {showActionButton && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <tr key={index}>
                <td
                  colSpan={columns.length + (showActionButton ? 2 : 1)}
                  style={{ textAlign: "center" }}
                >
                  Loading...
                </td>
              </tr>
            ))
          ) : items.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActionButton ? 2 : 1)}
                style={{ textAlign: "center", padding: "2rem" }}
              >
                <div style={{ color: "#666", fontSize: "1.1rem" }}>
                  No {entityName} found
                </div>
              </td>
            </tr>
          ) : (
            <>
              {items.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{(currentPage - 1) * pageSize + rowIndex + 1}</td>
                  {objectColumnNames.map((columnName, colIndex) => (
                    <td key={colIndex}>{item[columnName]}</td>
                  ))}
                  {showActionButton && (
                    <td>
                      <button
                        onClick={() => {
                          navigate(
                            addButtonNavigatePath +
                              "/" +
                              item[Object.keys(item)[0]]
                          );
                        }}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button className="btn-delete">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
              {Array.from({ length: emptyRowsCount }).map((_, index) => (
                <tr key={`empty-${index}`} style={{ height: "49px" }}>
                  <td colSpan={columns.length + (showActionButton ? 2 : 1)}>
                    &nbsp;
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevButton}>Previous</button>
        <span>
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </div>
  );
}

export default TableComponent;
