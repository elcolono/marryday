import { API_SERVER_URL } from '../lib/constants'

export default function PricingSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-11">
                        <h2 className="section-title"><span>{data.heading}</span></h2>
                    </div>
                </div>
                <div className="row align-items-end">
                    <div className="col-lg-3 pb-4">
                        {/* <h4 className="mb-3">Free Plan</h4> */}
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                        <img src={API_SERVER_URL + data.image.url} alt=""></img>
                        {/* <a href="#" className="btn btn-danger">Register</a> */}
                    </div>
                    <div className="col-lg-9">
                        <div className="row no-gutters">

                            {data.pricings.map((pricing) => (
                                <div className="col-md-4 price-card">
                                    <div className="price-card-header">
                                        <h4 className="mb-3">{pricing.heading}</h4>
                                        <span className="price"><span>€{pricing.price}</span>/{pricing.type == 'hourly' ? "Stunde" : "Tag"}</span>
                                    </div>
                                    <div className="price-text mb-4" dangerouslySetInnerHTML={{ __html: pricing.description }}>
                                    </div>
                                    {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
                                    <ul className="price-text">
                                        <li>Neque porro quisquam est qui dolorem</li>
                                        <li>Ut enim ad minima veniam</li>
                                        <li>Quis autem vel eum iure</li>
                                        <li>Et harum quidem rerum facilis est et expedita distinctio.</li>
                                    </ul> */}
                                    <a href="/contact" className="btn btn-danger">Get in Touch</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
