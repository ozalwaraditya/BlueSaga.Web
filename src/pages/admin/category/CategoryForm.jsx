import { useEffect, useState } from "react";
import "../../../styles/EntityForm.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { product_api } from "../../../utility/url";
import toast from "react-hot-toast";

function CategoryForm() {
  const [formdata, setFormdata] = useState({
    categoryName: "",
  });
  const { id } = useParams();
  const isEditMode = id != null;
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(
        product_api + `/api/Category/GetCategoryById/${id}`,
        {
          data: id,
          withCredentials: true,
        }
      );
      console.log("Fetced item : ", response.data);
      if (response.data.isSuccess) {
        setFormdata({
          categoryName: response.data.response.categoryName,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      if (value === "" || (parseInt(value) >= 0 && !isNaN(value))) {
        setFormdata((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    setFetchLoading(true);

    const url = isEditMode
      ? `/api/Category/UpdateCategory`
      : "/api/Category/CreateCategory";
    const method = isEditMode ? "put" : "post";
    const payload = {
      categoryId: isEditMode ? id : 0,
      categoryName: formdata.categoryName,
    };

    try {
      const response = await axios[method](product_api + url, payload, {
        withCredentials: true,
      });
      if (response.data.isSuccess) {
        toast.success(
          isEditMode
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        navigate("/management/category");
      } else {
        toast.error(response.data.message || "Operation failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setFetchLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="coupon-form">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading coupon...
        </div>
      </div>
    );
  }

  return (
    <div className="coupon-form">
      <div className="form-header">
        <h2>{isEditMode ? "Edit" : "Add New"} Category</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              value={formdata.categoryName}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
            className="btn-cancel"
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {isEditMode ? "Update" : "Add"} Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
