export default function Header({ mainMenus }) {

    const handleMenuIconClicked = () => {
        javascript: void (0);
    }

    return (
        <header id="header" className="colored-header fixed-top">
            <nav className="navbar navbar-expand-sm">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="assets/images/logos/mowo-spaces-logo.png" className="compact default dark" alt="Listigo" />
                    </a>

                    {/* <!-- Begin | Navigation [[ Find at scss/frameworks/base/navbar-nav.scss ]] --> */}
                    <nav className="ml-5" id="nav">
                        <ul className="navbar-nav">
                            {mainMenus[0].menu_items && mainMenus[0].menu_items.map((menuItem, i) => (
                                <li key={i} className="nav-item">
                                    <a href={menuItem.link_page.slug} className="nav-link">{menuItem.link_text}</a>
                                </li>
                            ))}

                        </ul>
                    </nav>
                    {/* <!-- End | Navigation --> */}

                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item"><a href="javascript:void(0);" data-toggle="modal" data-target="#sign_in">Login</a></li> */}
                        <li className="nav-item">
                            <a href="add-listing.html" className="btn btn-pill btn-danger btn-icon">
                                <i className="ion-md-mail"></i>
                                <span>Get in Touch</span>
                            </a>
                        </li>
                    </ul>
                    <a onClick={handleMenuIconClicked} id="hamburger" className="d-xl-none"><span></span></a>
                </div>
            </nav>
        </header>
    )
}
