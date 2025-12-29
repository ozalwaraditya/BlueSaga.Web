import { useNavigate } from "react-router-dom";

function UnAuthorized() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Unauthorized</h1>

      <p style={{ marginBottom: "20px", color: "#555" }}>
        You don’t have permission to access this page.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default UnAuthorized;
