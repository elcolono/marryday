import { API_IMAGE_URL } from '../lib/constants'

export default function CTASection({ data }) {
    return (
        <section className="section">
            <div className="promo">
                <div className="banner banner-scroll banner-overlay" data-parallax="scroll" data-image-src={data.image && API_IMAGE_URL + data.image.url}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-10 text-center mx-auto">
                            <h2 className="text-white">{data.description}</h2>
                            <div className="d-inline-block">
                                <a href={data.button_link} className="btn btn-pill btn-danger btn-icon">{data.button}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
