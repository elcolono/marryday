export default function Footer({ flatMenus, themeSettings }) {
  return (
    <>
      {/* <section className="section">
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
      </section> */}

      <footer id="footer">
        <div className="container">
          <div className="row list-bunch">
            <div className="col-xl-4 col-lg-5 list-bunch-item">
              <a href="index.html" className="d-inline-block mb-3">
                <img className="w-25" src="assets/images/logos/mowo-spaces-logo.png" alt="" />
              </a>
              <p>{themeSettings.about_short_description}</p>
              <div className="form-control-icon form-control-icon_right">
                <input type="text" placeholder="Email please" className="form-control" />
                <button type="button" className="form-control-icon_wrapper">
                  <span><i className="ion-md-arrow-forward"></i></span>
                </button>
              </div>
            </div>
            <div className="col-1 d-xl-block d-none"></div>
            <div className="col-lg-2 col-sm-4 list-bunch-item">
              <h6 className="mb-3">MOWO Spaces</h6>
              <ul className="links">
                {flatMenus && flatMenus.map((menu) => {
                  return menu.handle == "legal_links" && menu.menu_items.map((menuItem, i) => (
                    <li key={i}><a href={menuItem.link_page.slug}>{menuItem.link_text}</a></li>
                  )
                  )
                })}
              </ul>
            </div>
            <div className="col-lg-2 col-sm-4 list-bunch-item">
              <h6 className="mb-3">Quick-Links</h6>
              <ul className="links">
                {flatMenus && flatMenus.map((menu) => {
                  return menu.handle == "useful_links" && menu.menu_items.map((menuItem, i) => (
                    <li key={i}><a href={menuItem.link_page.slug}>{menuItem.link_text}</a></li>
                  )
                  )
                })}
              </ul>
            </div>
            <div className="col-lg-3 col-sm-4 list-bunch-item">
              {themeSettings.about_email && (
                <>
                  <h6 className="mb-1">Kontakt via Email</h6>
                  <a className="d-inline-block mb-3" href={`mailto:${themeSettings.about_email}`}>{themeSettings.about_email}</a>
                </>
              )}
              {themeSettings.about_phone && (
                <>
                  <h6 className="mb-1">Support 24x7</h6>
                  <a className="d-inline-block mb-3" href={`tel:${themeSettings.about_phone}`}>{themeSettings.about_phone}</a>
                </>
              )}

              {/* Begin | Social [[ Find at scss/frameworks/theme/social.scss ] */}
              <ul className="social">
                {themeSettings.facebook_link && (<li><a href={themeSettings.facebook_link} target="_blank"><i className="ion-logo-facebook"></i></a></li>)}
                {themeSettings.twitter_link && (<li><a href={themeSettings.twitter_link} target="_blank"><i className="ion-logo-twitter"></i></a></li>)}
                {themeSettings.linkedin_link && (<li><a href={themeSettings.linkedin_link} target="_blank"><i className="ion-logo-linkedin"></i></a></li>)}
                {themeSettings.instagram_link && (<li><a href={themeSettings.instagram_link} target="_blank"><i className="ion-logo-instagram"></i></a></li>)}
                {themeSettings.vimeo_link && (<li><a href={themeSettings.vimeo_link} target="_blank"><i className="ion-logo-vimeo"></i></a></li>)}
              </ul>
              {/* End | Social */}
            </div>
          </div>
          <div className="last-footer text-muted">
            &copy; 2020 MOWO Spaces. All rights reserved.
                </div>
        </div>
      </footer>
    </>
  )
}
