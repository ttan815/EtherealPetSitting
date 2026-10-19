import "../styles/HomeBannerSection.css"

export default function Home() {
    return (
        <div className="page">
            {/* HERO */}
            <main id="home" className="hero">
                {/* Decorative lines */}
                <svg
                    className="background-lines lines-left"
                    viewBox="0 0 300 300"
                    aria-hidden="true"
                >
                    <ellipse
                        cx="130"
                        cy="180"
                        rx="150"
                        ry="105"
                    />
                    <ellipse
                        cx="120"
                        cy="180"
                        rx="115"
                        ry="80"
                    />
                    <ellipse
                        cx="110"
                        cy="180"
                        rx="80"
                        ry="55"
                    />
                </svg>
                <svg
                    className="background-lines lines-right"
                    viewBox="0 0 380 380"
                    aria-hidden="true"
                >
                    <circle
                        cx="190"
                        cy="190"
                        r="125"
                    />
                    <circle
                        cx="190"
                        cy="190"
                        r="165"
                    />
                    <circle
                        cx="190"
                        cy="190"
                        r="205"
                    />
                </svg>
                {/* Hero content */}
                <section className="hero-content">
                    <p className="eyebrow">
                        WELCOME TO ANGELENA'S
                    </p>
                    <h1 className="hero-title">
                        Peace of mind
                        <span>
                            for your pets.
                        </span>
                    </h1>
                    <p className="hero-description">
                        Professional personalized care tailored to your
                        furry friend's unique needs. From drop-in visits
                        to overnight stays, we treat your pets like family.
                    </p>
                    <div className="hero-buttons">
                        <a
                            href="#"
                            className="hero-button primary-button"
                        >
                            Book an Appointment
                        </a>
                        <a
                            href="#"
                            className="hero-button secondary-button"
                        >
                            Create Account
                        </a>
                    </div>
                    {/* Rating */}
                    <div className="rating">
                        <div className="customer-icons">
                            <div className="customer">
                                ♡
                            </div>
                            <div className="customer">
                                ♡
                            </div>
                            <div className="customer">
                                ♡
                            </div>
                        </div>
                        <div className="rating-text">
                            <span className="rating-title">
                                Trusted by local families
                            </span>
                            <div>
                                <span className="rating-stars">
                                    ★★★★★
                                </span>
                                <span className="rating-count">
                                    5.0 · 32 ratings
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Hero visual */}
                <section className="hero-visual">
                    <div className="circle-glow"></div>
                    <div className="orbit orbit-one"></div>
                    <div className="orbit orbit-two"></div>
                    <div className="outer-circle"></div>
                    <div className="inner-circle">
                        <div className="pet-logo">
                            <div className="pet-name">
                                Angelena's
                            </div>
                            <div className="pet-drawing">
                                <div className="dog-ear"></div>
                                <div className="dog-head"></div>
                                <div className="dog-body"></div>
                                <div className="dog-leg-one"></div>
                                <div className="dog-leg-two"></div>
                                <div className="dog-tail"></div>
                            </div>
                            <div className="pet-brand">
                                ETHEREAL
                            </div>
                            <div className="pet-subtitle">
                                PET SITTING & CARE
                            </div>
                        </div>
                    </div>
                    {/* Pet photo 1 */}
                    <div className="photo-circle photo-top">
                        <span>◎</span>
                        PET PHOTO
                    </div>
                    {/* Pet photo 2 */}
                    <div className="photo-circle photo-bottom">
                        <span>◎</span>
                        PET PHOTO
                    </div>
                </section>
            </main>
        </div>
    );
}