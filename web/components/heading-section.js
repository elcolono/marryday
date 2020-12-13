import { API_SERVER_URL } from '../lib/constants'

export default function HeadingSection({ data, title }) {
    return (
        <section id="intro_section">
            <div className="row no-gutters">
                <div className="col-lg-6">
                    {/* <!-- Begin | Inner Banner Content [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                    <div className="inner-banner-content banner-content-white">
                        <div className="container container-half">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1 className="intro-section-title">{data.heading}</h1>
                                    <p>{data.description}</p>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End | Inner Banner Content --> */}
                </div>
                {/* <!-- Inner Banner [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                <div style={data.image ? { backgroundImage: `url(${process.env.CLIENT_API_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
            </div>
        </section>
    )
}