export default function HerSection({ data }) {
    return (
        <section id="intro_section">
            <div className="row no-gutters">
                <div className="col-lg-6">
                    {/* <!-- Begin | Inner Banner Content [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                    <div className="inner-banner-content banner-content-white">
                        <div className="container container-half">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1 className="intro-section-title">About us</h1>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">About</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End | Inner Banner Content --> */}
                </div>
                {/* <!-- Inner Banner [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                <div className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
            </div>
        </section>
    )
}