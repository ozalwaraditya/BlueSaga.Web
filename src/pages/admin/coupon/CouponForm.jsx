import { useEffect, useState } from "react";
import "../../../styles/EntityForm.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { coupon_api } from "../../../utility/url";
import toast from "react-hot-toast";

function CouponForm() {
  const [formdata, setFormdata] = useState({
    couponName: "",
    minimumAmount: "",
    discountAmount: "",
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
      const response = await axios.get(coupon_api + `/api/CouponAPI/${id}`, {
        data: id,
        withCredentials: true,
      });
      console.log("Fetced item : ", response.data);
      if (response.data.isSuccess) {
        setFormdata({
          couponName: response.data.response.couponName,
          minimumAmount: response.data.response.minimumAmount,
          discountAmount: response.data.response.discountAmount,
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

    const url = isEditMode ? `/api/CouponAPI/${id}` : "/api/CouponAPI";
    const method = isEditMode ? "put" : "post";
    const payload = {
      couponId: isEditMode ? id : 0,
      couponName: formdata.couponName,
      minimumAmount: formdata.minimumAmount,
      discountAmount: formdata.discountAmount,
    };

    console.log(url);
    console.log(method);
    console.log(payload);

    try {
      const response = await axios[method](coupon_api + url, payload, {
        withCredentials: true,
      });
      if (response.data.isSuccess) {
        toast.success(
          isEditMode
            ? "Coupon updated successfully!"
            : "Coupon created successfully!"
        );
        navigate("/management/coupons");
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
        <h2>{isEditMode ? "Edit" : "Add New"} Coupon</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="couponName">Coupon Name</label>
            <input
              id="couponName"
              name="couponName"
              type="text"
              value={formdata.couponName}
              onChange={handleChange}
              placeholder="Enter coupon name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="minimumAmount">Minimum Amount</label>
            <input
              id="minimumAmount"
              name="minimumAmount"
              value={formdata.minimumAmount}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="Enter minimum amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discountAmount">Discount Amount</label>
            <input
              id="discountAmount"
              name="discountAmount"
              value={formdata.discountAmount}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="Enter discount amount"
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
            {isEditMode ? "Update" : "Add"} Coupon
          </button>
        </div>
      </form>
    </div>
  );
}

export default CouponForm;
