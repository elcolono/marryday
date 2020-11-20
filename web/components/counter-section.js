export default function CounterSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 mx-auto">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5">
                                <h2 className="section-title">About our company</h2>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-xl-7 col-lg-6">
                                <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.</p>
                            </div>
                        </div>
                        <div className="row mt-5 pt-5 list-bunch" id="counter">
                            <div className="col-md-3 col-6 list-bunch-item text-center">
                                <span className="display-4 d-block"><span className="count" data-count="500">50</span>k</span>
                                <span className="font-weight-bold">Register user</span>
                            </div>
                            <div className="col-md-3 col-6 list-bunch-item text-center">
                                <span className="display-4 d-block"><span className="count" data-count="10">0</span>m</span>
                                <span className="font-weight-bold">Lists</span>
                            </div>
                            <div className="col-md-3 col-6 list-bunch-item text-center">
                                <span className="display-4 d-block"><span className="count" data-count="100">10</span>k</span>
                                <span className="font-weight-bold">Reviews</span>
                            </div>
                            <div className="col-md-3 col-6 list-bunch-item text-center">
                                <span className="display-4 d-block"><span className="count" data-count="10">0</span>k</span>
                                <span className="font-weight-bold">Daily visits</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
