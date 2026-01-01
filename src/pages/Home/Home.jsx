import { useState, useEffect } from "react";
import Footer from "../../components/layout/Footer.jsx";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // Carousel slides
  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Up to 50% Off on Selected Items",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Shop Now",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover the Latest Trends",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop",
      cta: "Explore",
    },
    {
      id: 3,
      title: "Exclusive Deals",
      subtitle: "Limited Time Offers",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
      cta: "Get Started",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Trust signals
  const trustSignals = [
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Secure Payment",
      desc: "100% secure transactions",
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Free Shipping",
      desc: "On orders over $50",
    },
    {
      icon: <RefreshCw className="w-10 h-10" />,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Quality Guaranteed",
      desc: "Premium products only",
    },
  ];

  // Featured categories
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
      count: "120+ Products",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
      count: "250+ Products",
    },
    {
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop",
      count: "180+ Products",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop",
      count: "95+ Products",
    },
  ];

  // Benefits
  const benefits = [
    {
      title: "Best Prices",
      desc: "We offer competitive prices on millions of items",
    },
    {
      title: "Fast Delivery",
      desc: "Get your orders delivered quickly and safely",
    },
    { title: "24/7 Support", desc: "Our team is here to help you anytime" },
    {
      title: "Wide Selection",
      desc: "Browse through thousands of quality products",
    },
  ];

  // Reviews
  const reviews = [
    {
      name: "Aarav Sharma",
      rating: 5,
      text: "Delivery was on time.",
      avatar: "AS",
    },
    {
      name: "Priya Nair",
      rating: 4,
      text: "Smooth shopping experience.",
      avatar: "PN",
    },
    {
      name: "Rohit Verma",
      rating: 5,
      text: "Good prices and genuine products.",
      avatar: "RV",
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        {/* Hero Carousel */}
        <section
          style={{ position: "relative", height: "600px", overflow: "hidden" }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
                backgroundImage: `linear-gradient(rgba(10, 61, 98, 0.6), rgba(10, 61, 98, 0.6)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "white",
                  padding: "0 20px",
                  maxWidth: "800px",
                }}
              >
                <h1
                  style={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {slide.subtitle}
                </p>
                <button
                  style={{
                    backgroundColor: "#f39c12",
                    color: "white",
                    padding: "16px 48px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(243, 156, 18, 0.4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "translateY(0)")
                  }
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronLeft className="w-6 h-6" color="#0a3d62" />
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronRight className="w-6 h-6" color="#0a3d62" />
          </button>

          {/* Dots */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "12px",
            }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: currentSlide === index ? "40px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor:
                    currentSlide === index
                      ? "#f39c12"
                      : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </section>

        {/* Trust Signals */}
        <section style={{ backgroundColor: "white", padding: "60px 20px" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
            }}
          >
            {trustSignals.map((signal, index) => (
              <div key={index} style={{ textAlign: "center", padding: "20px" }}>
                <div
                  style={{
                    color: "#0a3d62",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {signal.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#0a3d62",
                    marginBottom: "8px",
                  }}
                >
                  {signal.title}
                </h3>
                <p style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "#0a3d62",
                marginBottom: "50px",
              }}
            >
              Shop by Category
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    height: "350px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `linear-gradient(to bottom, rgba(10, 61, 98, 0.3), rgba(10, 61, 98, 0.7)), url(${cat.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      left: "30px",
                      color: "white",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: "1rem", opacity: 0.9 }}>
                      {cat.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "#0a3d62",
                marginBottom: "50px",
              }}
            >
              Why Choose BlueSaga
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "40px",
              }}
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    padding: "40px 30px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    borderLeft: "4px solid #f39c12",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateX(8px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateX(0)")
                  }
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: "#0a3d62",
                      marginBottom: "12px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: "#6c757d", lineHeight: "1.6" }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Reviews */}
        <section style={{ padding: "80px 20px", backgroundColor: "#0a3d62" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                marginBottom: "50px",
              }}
            >
              What Our Customers Say
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "15px" }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        fill="#f39c12"
                        color="#f39c12"
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      color: "#495057",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    "{review.text}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#f39c12",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          color: "#0a3d62",
                          marginBottom: "2px",
                        }}
                      >
                        {review.name}
                      </p>
                      <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            padding: "100px 20px",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#0a3d62",
                marginBottom: "20px",
              }}
            >
              Ready to Start Shopping?
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#6c757d",
                marginBottom: "40px",
                lineHeight: "1.6",
              }}
            >
              Join thousands of happy customers and discover amazing products at
              unbeatable prices.
            </p>
            <button
              style={{
                backgroundColor: "#f39c12",
                color: "white",
                padding: "18px 60px",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(243, 156, 18, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 20px rgba(243, 156, 18, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 6px 16px rgba(243, 156, 18, 0.4)";
              }}
              onClick={() => {
                navigate("/products");
              }}
            >
              Browse Products <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
