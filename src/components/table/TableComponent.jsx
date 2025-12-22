import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import "./TableComponent.css";

function TableComponent({ entity, url }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  function handlePrevButton() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleNextButton() {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  }

  const fetchPaginatedData = async () => {
    const tablePromise = axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    try {
      await tablePromise;
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      const data = [
        { first: "Mark", last: "Otto", handle: "@mdo" },
        { first: "John", last: "Doe", handle: "@jdoe" },
        { first: "Mark", last: "Otto", handle: "@mdo" },
        { first: "John", last: "Doe", handle: "@jdoe" },
        { first: "Mark", last: "Otto", handle: "@mdo" },
        { first: "John", last: "Doe", handle: "@jdoe" },
        { first: "Mark", last: "Otto", handle: "@mdo" },
        { first: "John", last: "Doe", handle: "@jdoe" },
        { first: "Mark", last: "Otto", handle: "@mdo" },
        { first: "John", last: "Doe", handle: "@jdoe" },
      ];
      setUsers(data);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="content-management">
      <div className="management-header">
        <h2>{entity} Management</h2>
        <button className="btn-add">Add New {entity}</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td colSpan="4">Loading...</td>
                </tr>
              ))
            : users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.first}</td>
                  <td>{user.last}</td>
                  <td>{user.handle}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevButton}>Previous</button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </div>
  );
}

export default TableComponent;
