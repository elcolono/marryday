export default function TeamSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-11">
                        <h2 className="section-title"><span>Our team behind this awesome platform</span></h2>
                    </div>
                </div>
                <div className="row list-bunch">
                    <div className="col-lg-3 col-sm-6 list-bunch-item">
                        <img src="assets/images/team/manager.jpg" className="retina" alt="" />
                        <h4 className="mb-1 mt-3">Petey Cruiser</h4>
                        <p>Manager</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 list-bunch-item">
                        <img src="assets/images/team/co-manager.jpg" className="retina" alt="" />
                        <h4 className="mb-1 mt-3">Anna Mull</h4>
                        <p>Co-Manager</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 list-bunch-item">
                        <img src="assets/images/team/photographer.jpg" className="retina" alt="" />
                        <h4 className="mb-1 mt-3">Paul Molive</h4>
                        <p>Photographer</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 list-bunch-item">
                        <img src="assets/images/team/consultant.jpg" className="retina" alt="" />
                        <h4 className="mb-1 mt-3">Paige Turner</h4>
                        <p>Consultant</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
