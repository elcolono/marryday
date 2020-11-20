export default function Footer() {
  return (
    <>
      <section className="section">
        <div className="app-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <h2>Our app available on</h2>
                <p>We are on mobile now get this app and enjoy amazing user experience. Download the app and
                                go to travel new places in the world.</p>
                <div className="btn-inline">
                  <button type="button" className="btn btn-dark btn-icon">
                    <i className="ion-logo-apple"></i>
                    <span>Add Store</span>
                  </button>
                  <button type="button" className="btn btn-dark btn-icon">
                    <i className="ion-logo-android"></i>
                    <span>Google Play</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-7">
                <img src="assets/images/backgrounds/app-hero.png" className="app-hero mt-5 mt-lg-0" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer">
        <div className="container">
          <div className="row list-bunch">
            <div className="col-xl-4 col-lg-5 list-bunch-item">
              <a href="index.html" className="d-inline-block mb-3">
                <img className="w-25" src="assets/images/logos/mowo-spaces-logo.png" alt="" />
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dignissimos enim.</p>
              <div className="form-control-icon form-control-icon_right">
                <input type="text" placeholder="Email please" className="form-control" />
                <button type="button" className="form-control-icon_wrapper">
                  <span><i className="ion-md-arrow-forward"></i></span>
                </button>
              </div>
            </div>
            <div className="col-1 d-xl-block d-none"></div>
            <div className="col-lg-2 col-sm-4 list-bunch-item">
              <h6 className="mb-3">Company</h6>
              <ul className="links">
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Use</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-sm-4 list-bunch-item">
              <h6 className="mb-3">Quick links</h6>
              <ul className="links">
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Wallet</a></li>
                <li><a href="#">Profile</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-sm-4 list-bunch-item">
              <h6 className="mb-1">Contact via email</h6>
              <a className="d-inline-block mb-3" href="mailto:listigo@example.com">listigo@example.com</a>
              <h6 className="mb-1">Support 24x7</h6>
              <a className="d-inline-block mb-3" href="tel:1800000123">1800 000 1234</a>
              {/* Begin | Social [[ Find at scss/frameworks/theme/social.scss ] */}
              <ul className="social">
                <li><a href="#"><i className="ion-logo-facebook"></i></a></li>
                <li><a href="#"><i className="ion-logo-twitter"></i></a></li>
                <li><a href="#"><i className="ion-logo-linkedin"></i></a></li>
                <li><a href="#"><i className="ion-logo-instagram"></i></a></li>
                <li><a href="#"><i className="ion-logo-vimeo"></i></a></li>
              </ul>
              {/* End | Social */}
            </div>
          </div>
          <div className="last-footer text-muted">
            &copy; 2020 Kri8thm. All rights reserved.
                </div>
        </div>
      </footer>
    </>
  )
}
