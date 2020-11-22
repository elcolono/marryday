import { API_URL } from '../lib/constants'

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
                                    <h1 className="intro-section-title">{data.heading}</h1>
                                    <p>{data.description}</p>
                                    <a href={data.button_link} className="btn btn-pill btn-danger btn-icon">{data.button}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End | Inner Banner Content --> */}
                </div>
                {/* <!-- Inner Banner [[ Find at scss/frameworks/base/banner.scss ]] --> */}
                <div style={data.image ? { backgroundImage: `url(${API_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
            </div>
        </section>
    )
}