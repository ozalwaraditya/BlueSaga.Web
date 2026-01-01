import { useState, useEffect } from "react";
import ProductCard from "../../components/product/ProductCard";
import "./Products.css";
import { product_api } from "../../utility/url";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  const loadProducts = async (pageNum) => {
    setLoading(true);
    try {
      const tablePromise = await axios.get(
        product_api + "/api/Product/GetProducts",
        {
          headers: { "Content-Type": "application/json" },
          params: { currentPage: pageNum, pageSize },
          withCredentials: true,
        }
      );
      
      const data = tablePromise.data.response;
      console.log("API Response:", data);
      
      const newItems = data.items || [];
      const total = data.totalItems || 0;
      
      setTotalItems(total);
      
      if (pageNum === 1) {
        setProducts(newItems);
      } else {
        setProducts((prev) => [...prev, ...newItems]);
      }
      
      // Calculate if there are more items to load
      const currentlyLoadedCount = pageNum === 1 
        ? newItems.length 
        : products.length + newItems.length;
      
      // Set hasMore based on whether we've loaded all items
      // Also check if the current page returned fewer items than pageSize
      setHasMore(
        currentlyLoadedCount < total && newItems.length === pageSize
      );
      
    } catch (error) {
      console.error("Error loading products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Products</h2>
        <p>Discover quality tech at the best price</p>
        {totalItems > 0 && (
          <small>Showing {products.length} of {totalItems} products</small>
        )}
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.productId || product.id}
            product={product}
          />
        ))}
      </div>

      {loading && products.length === 0 && (
        <div className="loading-message">
          <p>Loading products...</p>
        </div>
      )}

      {hasMore && !loading && products.length > 0 && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            Load More Products
          </button>
        </div>
      )}

      {loading && products.length > 0 && (
        <div className="loading-message">
          <p>Loading more...</p>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="end-message">
          <p>You've reached the end of our products</p>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="end-message">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}

export default Products;