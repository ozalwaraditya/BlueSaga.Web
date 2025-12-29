import "./Home.css";

function HeroCarousel() {
  const slides = [
    {
      id: 1,
      image: "/shoes.png",
      title: "Shoes",
      subtitle: "Sport wears.",
      cta: "Shop Shoes",
    },
    {
      id: 2,
      image: "/watch.png",
      title: "Premium Watches",
      subtitle: "Timeless style for every occasion.",
      cta: "Explore Watches",
    },
    {
      id: 3,
      image: "/headphone.png",
      title: "Premium Headphones",
      subtitle: "Experience crystal clear sound.",
      cta: "Buy Headphones",
    },
  ];

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.title}
              style={{ height: "80vh", objectFit: "cover" }}
            />

            <div className="carousel-caption text-start">
              <h1 className="hero-title fw-bold mb-3">{slide.title}</h1>

              <p className="hero-subtitle mb-4">{slide.subtitle}</p>

              <button className="hero-cta btn btn-primary px-4 py-2">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default HeroCarousel;
