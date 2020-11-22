export default function CounterSection({ data }) {
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
                            <div className="col-xl-7 col-lg-6">
                                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                            </div>
                        </div>
                        <div className="row mt-5 pt-5 list-bunch" id="counter">
                            {data.counters && data.counters.map((counter, i) => (
                                <div key={i} className="col-md-3 col-6 list-bunch-item text-center">
                                    <span className="display-4 d-block"><span className="count" data-count={counter.count}>0</span>{counter.unit}</span>
                                    <span className="font-weight-bold">{counter.heading}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
