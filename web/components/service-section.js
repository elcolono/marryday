import { API_SERVER_URL } from '../lib/constants'

export default function ServiceSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-11">
                        <h2 className="section-title"><span>{data.heading}</span></h2>
                    </div>
                </div>
                {/* <!-- Begin | List Bunch [[ Find at scss/frameworks/components/list-bunch.scss ]] --> */}
                <div className="row list-bunch">
                    {data.services && data.services.map((service, i) => (
                        <div key={i} className="col-lg-4 list-bunch-item">
                            <span className="icon">
                                {data.layout == "service_with_icon" && (<i className={`ion-md-${service.icon}`}></i>)}
                                {data.layout == "service_with_image" && (<img src={API_SERVER_URL + service.image.url} alt=""></img>)}
                            </span>
                            <h4 className="mt-3 mb-2">{service.heading}</h4>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
                {/* <!-- End | List Bunch --> */}
            </div>
        </section>
    )
}
