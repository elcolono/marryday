export default function ContentSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 mx-auto">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5">
                                <h2 className="section-title">{data.heading}</h2>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-xl-7 col-lg-6" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
