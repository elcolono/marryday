import { API_IMAGE_URL } from '../lib/constants'

export default function TeamSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-11">
                        <h2 className="section-title"><span>{data.heading}</span></h2>
                    </div>
                </div>
                <div className="row list-bunch">
                    {data.members && data.members.map((member) => (
                        <div className="col-lg-3 col-sm-6 list-bunch-item">
                            <img src={API_IMAGE_URL + member.image.url} className="retina" alt="" />
                            <h4 className="mb-1 mt-3">{member.name}</h4>
                            <p>{member.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
