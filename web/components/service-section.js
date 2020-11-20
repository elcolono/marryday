export default function ServiceSection({ data }) {
    return (
        <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-lg-8 col-md-11">
                    <h2 className="section-title"><span>Why choose us</span></h2>
                </div>
            </div>
            {/* <!-- Begin | List Bunch [[ Find at scss/frameworks/components/list-bunch.scss ]] --> */}
            <div className="row list-bunch">
                <div className="col-lg-4 list-bunch-item">
                    <span className="icon">
                        <i className="ion-md-code"></i>
                    </span>
                    <h4 className="mt-3 mb-2">Clean coded</h4>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa cum sociis natoque.</p>
                </div>
                <div className="col-lg-4 list-bunch-item">
                    <span className="icon">
                        <i className="ion-md-browsers"></i>
                    </span>
                    <h4 className="mt-3 mb-2">Admin panel</h4>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo.</p>
                </div>
                <div className="col-lg-4 list-bunch-item">
                    <span className="icon">
                        <i className="ion-md-phone-portrait"></i>
                    </span>
                    <h4 className="mt-3 mb-2">Fully responsive</h4>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.</p>
                </div>
            </div>
            {/* <!-- End | List Bunch --> */}
        </div>
    </section>
    )
}
