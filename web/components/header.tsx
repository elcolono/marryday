import Link from 'next/link'
import Router from 'next/router';
import { signout } from '../actions/auth'

export default function Header({ user, mainMenus, themeSettings }) {

    const handleMenuIconClicked = () => {
        javascript: void (0);
    }

    return (
        <header id="header" className="colored-header fixed-top">
            <nav className="navbar navbar-expand-sm">
                <div className="container">
                    <Link href="/">
                        <a className="navbar-brand">
                            <img src="assets/images/logos/mowo-spaces-logo.png" className="compact default dark" alt="Listigo" />
                        </a>
                    </Link>

                    {/* <!-- Begin | Navigation [[ Find at scss/frameworks/base/navbar-nav.scss ]] --> */}
                    <nav className="ml-5" id="nav">
                        <ul className="navbar-nav">
                            {mainMenus[0].menu_items && mainMenus[0].menu_items.map((menuItem, i) => (
                                <li key={i} className="nav-item">
                                    <Link href={menuItem.link_page.slug}>
                                        <a className="nav-link">{menuItem.link_text}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {/* <!-- End | Navigation --> */}

                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item"><a href="javascript:void(0);" data-toggle="modal" data-target="#sign_in">Login</a></li> */}
                        {user.id && (
                            <>
                                <Link href="/dashboard">
                                    <a>
                                        <li className="nav-item">
                                            <div className="media align-items-center">
                                                <div className="avatar avatar-sm">
                                                    <img src="assets/images/user/32/user-1.jpg" className="retina" alt="" />
                                                </div>
                                                <div className="media-body pl-2 avatar-name d-none d-md-block">{user.first_name} {user.last_name}</div>
                                            </div>
                                        </li>
                                    </a>
                                </Link>
                                <div className="dropdown">
                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ion-md-arrow-dropdown"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link href="signin">
                                            <a onClick={() => signout(() => Router.push('/signin'))} className="dropdown-item">Logout</a>
                                        </Link>
                                        <Link href="booking">
                                            <a className="dropdown-item">Buchen</a>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) || (
                                <>
                                    <li className="nav-item">
                                        <Link href="/signin">
                                            <a className="nav-link">Login</a>
                                        </Link>
                                    </li>
                                    {themeSettings.header_cta_text && (
                                        <li className="nav-item">
                                            <a href={themeSettings.header_cta_link} className="btn btn-pill btn-danger btn-icon">
                                                <i className={themeSettings.header_cta_icon}></i>
                                                <span>{themeSettings.header_cta_text}</span>
                                            </a>
                                        </li>
                                    )}
                                </>
                            )}
                    </ul>
                    <a onClick={handleMenuIconClicked} id="hamburger" className="d-xl-none"><span></span></a>
                </div>
            </nav>
        </header>
    )
}
