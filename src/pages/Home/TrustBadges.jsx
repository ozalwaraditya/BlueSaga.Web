import "./TrustBadges.css";

function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: "bi-truck",
      title: "Free Shipping",
      description: "On all orders",
    },
    {
      id: 2,
      icon: "bi-shield-lock",
      title: "Secure Payments",
      description: "100% protected",
    },
    {
      id: 3,
      icon: "bi-arrow-repeat",
      title: "Easy Returns",
      description: "7-day return policy",
    },
    {
      id: 4,
      icon: "bi-credit-card",
      title: "Multiple Payments",
      description: "UPI, Cards & COD",
    },
  ];

  return (
    <section className="trust-badges">
      <div className="container">
        <div className="trust-card">
          <div className="row text-center">
            {badges.map((badge) => (
              <div key={badge.id} className="col-6 col-md-3">
                <div className="trust-badge">
                  <i className={`bi ${badge.icon} trust-icon`} />
                  <h6 className="trust-title">{badge.title}</h6>
                  <p className="trust-desc">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
