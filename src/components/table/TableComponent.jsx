import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./TableComponent.css";
import { useNavigate } from "react-router-dom";
import { access_token } from "../../utility/url";

function TableComponent({
  entityName,
  url,
  deleteUrl,
  columns,
  columnTableIndex,
  pageSize,
  addButtonNavigatePath,
  showActionButton = true,
  showOrderActions = false,
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
    const token = localStorage.getItem(access_token);

    const tablePromise = axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { currentPage, pageSize },
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

  const handleDelete = async (itemId) => {
    if (
      !window.confirm(`Are you sure you want to delete this ${entityName}?`)
    ) {
      return;
    }

    const token = localStorage.getItem(access_token);
    console.log("url : ", `${deleteUrl}/${itemId}`);
    const deletePromise = axios.delete(`${deleteUrl}/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.promise(deletePromise, {
      loading: `Deleting ${entityName}...`,
      success: (response) => {
        if (response.data.isSuccess) {
          fetchPaginatedData();
          return `${entityName} deleted successfully`;
        }
        throw new Error(response.data.message);
      },
      error: (error) => {
        return (
          error.response?.data?.message ||
          error.message ||
          `Failed to delete ${entityName}`
        );
      },
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error(error);
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
            {showOrderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <tr key={index}>
                <td
                  colSpan={
                    columns.length +
                    (showActionButton ? 2 : 1) +
                    (showOrderActions ? 2 : 1)
                  }
                  style={{ textAlign: "center" }}
                >
                  Loading...
                </td>
              </tr>
            ))
          ) : items.length === 0 ? (
            <tr>
              <td
                colSpan={
                  columns.length +
                  (showActionButton ? 2 : 1) +
                  (showOrderActions ? 2 : 1)
                }
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
                      <button
                        onClick={() => handleDelete(item[Object.keys(item)[0]])}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  {showOrderActions && (
                    <td>
                      <button
                        onClick={() => {
                          navigate(
                            addButtonNavigatePath +
                              "/" +
                              item[Object.keys(item)[0]],
                            {
                              state: item, // ✅ Pass the entire item object
                            }
                          );
                        }}
                        className="btn-edit"
                      >
                        Show more
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {Array.from({ length: emptyRowsCount }).map((_, index) => (
                <tr key={`empty-${index}`} style={{ height: "49px" }}>
                  <td
                    colSpan={
                      columns.length +
                      (showActionButton ? 2 : 1) +
                      (showOrderActions ? 1 : 0)
                    }
                  >
                    {" "}
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
