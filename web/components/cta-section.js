export default function CTASection({ data }) {
    return (
        <section className="section">
            <div className="promo">
                <div className="banner banner-scroll banner-overlay" data-parallax="scroll" data-image-src="assets/images/backgrounds/promo.jpg"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-10 text-center mx-auto">
                            <h2 className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cupiditate dolor ducimus ea earum esse ipsum iste iusto maiores.</h2>
                            <div className="d-inline-block">
                                <a href="javascript:void(0);" className="btn btn-pill btn-danger btn-icon">
                                    <i className="ion-md-play"></i>
                                    <span>Play video</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
