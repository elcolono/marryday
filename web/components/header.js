export default function Header() {
    return (
        <header id="header" className="colored-header fixed-top">
            <nav className="navbar navbar-expand-sm">
                <div className="container">
                    <a className="navbar-brand" href="index.html">Logo</a>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a href="javascript:void(0);" data-toggle="modal" data-target="#sign_in">Login</a></li>
                        <li className="nav-item">
                            <a href="add-listing.html" className="btn btn-pill btn-danger btn-icon">
                                <i className="ion-md-add"></i>
                                <span>Add Listing</span>
                            </a>
                        </li>
                    </ul>
                    <a href="javascript:void(0);" id="hamburger"><span></span></a>
                </div>
            </nav>
        </header>
    )
}
