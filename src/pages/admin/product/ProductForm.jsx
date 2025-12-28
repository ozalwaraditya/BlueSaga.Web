import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { product_api } from "../../../utility/url";

function ProductForm() {
  const [formdata, setFormdata] = useState({
    productName: "",
    description: "",
    categoryId: "",
    productImageUrl: "",
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const isEditMode = id != null;
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        product_api + "/api/Category/GetAllCategories",
        {
          withCredentials: true,
        }
      );
      if (response.data.isSuccess) {
        setCategories(response.data.response);
      } else {
        toast.error(response.data.message || "Failed to fetch categories");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load categories";
      toast.error(errorMessage);
    }
  };

  const fetchProduct = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(
        product_api + `/api/Product/GetProductById/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("category : ", response);

      if (response.data.isSuccess) {
        const product = response.data.response;
        setFormdata({
          productName: product.productName || "",
          description: product.description || "",
          categoryId: product.categoryId || "",
          productImageUrl: product.productImageUrl || "",
          price: product.price || "",
        });
      } else {
        toast.error(response.data.message || "Failed to fetch product");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load product";
      toast.error(errorMessage);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      if (value === "" || (parseFloat(value) >= 0 && !isNaN(value))) {
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
    setFetchLoading(true);

    const url = isEditMode
      ? "/api/Product/UpdateProduct"
      : "/api/Product/CreateProduct";

    const payload = {
      productId: isEditMode ? parseInt(id) : 0,
      productName: formdata.productName,
      description: formdata.description,
      categoryId: parseInt(formdata.categoryId),
      productImageUrl: formdata.productImageUrl,
      price: parseFloat(formdata.price),
    };

    const method = isEditMode ? "put" : "post"
    try {
      const response = await axios[method](product_api + url, payload, {
        withCredentials: true,
      });

      if (response.data.isSuccess) {
        toast.success(
          isEditMode
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        navigate("/management/products");
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

  if (fetchLoading && isEditMode) {
    return (
      <div className="coupon-form">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading Product...
        </div>
      </div>
    );
  }

  return (
    <div className="coupon-form">
      <div className="form-header">
        <h2>{isEditMode ? "Edit" : "Add New"} Product</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              name="productName"
              type="text"
              value={formdata.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formdata.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formdata.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formdata.price}
              onChange={handleChange}
              placeholder="Enter price in rupees"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productImageUrl">Image URL</label>
            <input
              id="productImageUrl"
              name="productImageUrl"
              type="text"
              value={formdata.productImageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          {formdata.productImageUrl && (
            <div className="form-group">
              <label>Image Preview</label>
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={formdata.productImageUrl}
                  alt="Product preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="btn-cancel"
            disabled={fetchLoading}
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={fetchLoading}>
            {fetchLoading
              ? "Processing..."
              : isEditMode
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
