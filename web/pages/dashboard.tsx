import Layout from '../components/layout'
import Head from 'next/head'
import { fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ user, mainMenus, flatMenus, themeSettings }) {
    return (
        <Layout user={user} mainMenus={mainMenus} flatMenus={flatMenus} themeSettings={themeSettings}>
            <Head>
                <title>Dashboard {CMS_NAME}</title>
                {/* <!-- Seo Meta --> */}
                <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
                <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
            </Head>

            {!user?.id ? (
                <section id="intro_section">
                    <div className="row no-gutters coming-soon">
                        <div className="col-lg-6">
                            <div className="banner-content banner-content-white">
                                <div className="container container-half">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <h1 className="intro-section-title">Ups.</h1>
                                            <div> Bitte melden Sie sich an</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
                    </div>
                </section>
            ) : (
                    <div id="intro_section" className="section under-header mb-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <ul className="dashboard--sidebar list-unstyled">
                                        <li>
                                            <a href="dashboard.html" className="dashboard--sidebar__link active">
                                                <i className="ion-md-stats"></i>
                                                <span>Dashboard</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="invoice.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-document"></i>
                                                <span>Invoice</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="booking.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-bookmark"></i>
                                                <span>Booking</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="wallet.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-wallet"></i>
                                                <span>Wallet</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="reviews.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-star"></i>
                                                <span>Reviews</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="my-listing.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-list"></i>
                                                <span>My Listing</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="notification.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-notifications"></i>
                                                <span>Notification</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="profile.html" className="dashboard--sidebar__link">
                                                <i className="ion-md-contact"></i>
                                                <span>Profile</span>
                                            </a>
                                        </li>
                                    </ul>
                                    {/* <!-- End | Dashboard Sidebar --> */}
                                </div>
                                <div className="col-lg-9">
                                    {/* <!-- Begin | Dashboard Content [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                    <div className="dashboard--content">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb mb-5">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                            </ol>
                                        </nav>

                                        <div className="row">
                                            <div className="col-md-4">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card overflow-hidden dashboard--card bg-danger text-white border-0">
                                                    <div className="dashboard--card__icon"><i className="ion-md-list"></i></div>
                                                    <div className="card-body">
                                                        <h2 className="mb-0 text-white">1023</h2>
                                                        <p>Total Listing</p>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-4">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card overflow-hidden dashboard--card bg-warning border-0">
                                                    <div className="dashboard--card__icon"><i className="ion-md-star"></i></div>
                                                    <div className="card-body">
                                                        <h2 className="mb-0">2405</h2>
                                                        <p>Total Reviews</p>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-4">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card overflow-hidden dashboard--card">
                                                    <div className="dashboard--card__icon"><i className="ion-md-bookmark"></i></div>
                                                    <div className="card-body">
                                                        <h2 className="mb-0">568</h2>
                                                        <p>Total Bookmarked</p>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-5">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card dashboard--card">
                                                    <div className="card-body">
                                                        <h5 className="mb-0">Listing Statistics</h5>
                                                        <p className="font-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                                        <div>
                                                            <canvas id="statistics"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-7">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card dashboard--card">
                                                    <div className="card-body">
                                                        <h5>Ads Campaigns</h5>
                                                        <div>
                                                            <canvas id="campaigns"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-7">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card dashboard--card">
                                                    <div className="card-body">
                                                        <h5>Recent Activities</h5>
                                                        <ul className="list-unstyled mb-0">
                                                            <li className="media mb-3">
                                                                <div className="avatar-icon avatar-sm">
                                                                    <i className="ion-md-list"></i>
                                                                </div>
                                                                <div className="media-body pl-3">
                                                                    <p className="font-md text-muted mb-1">Your listing <a href="#" className="font-weight-bold">A1 Mall</a> has been approved.</p>
                                                                    <span className="d-block font-sm text-muted">10 hours ago</span>
                                                                </div>
                                                            </li>
                                                            <li className="media mb-3">
                                                                <div className="avatar-icon avatar-sm">
                                                                    <i className="ion-md-bookmark"></i>
                                                                </div>
                                                                <div className="media-body pl-3">
                                                                    <p className="font-md text-muted mb-1">Someone bookmark your <a href="#" className="font-weight-bold">First dating cafe</a> listing.</p>
                                                                    <span className="d-block font-sm text-muted">12 hours ago</span>
                                                                </div>
                                                            </li>
                                                            <li className="media mb-3">
                                                                <div className="avatar avatar-sm">
                                                                    <img src="assets/images/user/32/user-1.jpg" className="retina" alt="" />
                                                                </div>
                                                                <div className="media-body pl-3">
                                                                    <p className="font-md text-muted mb-1"><a href="#" className="font-weight-bold">Herris</a> gives 5 star rating on <a href="#" className="font-weight-bold">Good Restaurant</a></p>
                                                                    <span className="d-block font-sm text-muted">1 day ago</span>
                                                                </div>
                                                            </li>
                                                            <li className="media mb-3">
                                                                <div className="avatar avatar-sm">
                                                                    <img src="assets/images/user/32/user-2.jpg" className="retina" alt="" />
                                                                </div>
                                                                <div className="media-body pl-3">
                                                                    <p className="font-md text-muted mb-1"><a href="#" className="font-weight-bold">Paige Turner</a> bookmark your <a href="#" className="font-weight-bold">Alpha Muscle Center</a> listing</p>
                                                                    <span className="d-block font-sm text-muted">1 day ago</span>
                                                                </div>
                                                            </li>
                                                            <li className="media">
                                                                <div className="avatar-icon avatar-sm">
                                                                    <i className="ion-md-star"></i>
                                                                </div>
                                                                <div className="media-body pl-3">
                                                                    <p className="font-md text-muted mb-1">Someone gives 5 star rating on <a href="#" className="font-weight-bold">Continental Hotel</a></p>
                                                                    <span className="d-block font-sm text-muted">2 days ago</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                            <div className="col-md-5">
                                                {/* <!-- Begin | Dashboard Card [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                <div className="card dashboard--card">
                                                    <div className="card-body">
                                                        <h5>Invoices</h5>
                                                        {/* <!-- Begin | Data List [[ Find at scss/frameworks/theme/admin-panel.scss ]] --> */}
                                                        <ul className="list-unstyled data--list">
                                                            <li className="data--list__item">
                                                                <div className="data--list__item-content">
                                                                    <p className="mb-1"><a href="invoice.html" className="font-weight-bold text-truncate">Mario Speedwagon</a></p>
                                                                    <ul className="list-unstyled data--list__item-content__info">
                                                                        <li className="text-danger">#000IN1</li>
                                                                        <li>Sep 11, 2020</li>
                                                                        <li><span className="badge badge-success">Paid</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="ion-md-more"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">View</a>
                                                                        <a className="dropdown-item" href="#">Edit</a>
                                                                        <a className="dropdown-item text-danger" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="data--list__item">
                                                                <div className="data--list__item-content">
                                                                    <p className="mb-1"><a href="invoice.html" className="font-weight-bold text-truncate">Petey Cruiser</a></p>
                                                                    <ul className="list-unstyled data--list__item-content__info">
                                                                        <li className="text-danger">#000IN2</li>
                                                                        <li>Sep 08, 2020</li>
                                                                        <li><span className="badge badge-light">Cancel</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="ion-md-more"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">View</a>
                                                                        <a className="dropdown-item" href="#">Edit</a>
                                                                        <a className="dropdown-item text-danger" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="data--list__item">
                                                                <div className="data--list__item-content">
                                                                    <p className="mb-1"><a href="invoice.html" className="font-weight-bold text-truncate">Anna Sthesia</a></p>
                                                                    <ul className="list-unstyled data--list__item-content__info">
                                                                        <li className="text-danger">#000IN3</li>
                                                                        <li>Sep 05, 2020</li>
                                                                        <li><span className="badge badge-success">Paid</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="ion-md-more"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">View</a>
                                                                        <a className="dropdown-item" href="#">Edit</a>
                                                                        <a className="dropdown-item text-danger" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="data--list__item">
                                                                <div className="data--list__item-content">
                                                                    <p className="mb-1"><a href="invoice.html" className="font-weight-bold text-truncate">Paul Molive</a></p>
                                                                    <ul className="list-unstyled data--list__item-content__info">
                                                                        <li className="text-danger">#000IN4</li>
                                                                        <li>Sep 01, 2020</li>
                                                                        <li><span className="badge badge-warning">Unpaid</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="ion-md-more"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">View</a>
                                                                        <a className="dropdown-item" href="#">Edit</a>
                                                                        <a className="dropdown-item text-danger" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className="data--list__item">
                                                                <div className="data--list__item-content">
                                                                    <p className="mb-1"><a href="invoice.html" className="font-weight-bold text-truncate">Anna Mull</a></p>
                                                                    <ul className="list-unstyled data--list__item-content__info">
                                                                        <li className="text-danger">#000IN5</li>
                                                                        <li>Sep 01, 2020</li>
                                                                        <li><span className="badge badge-warning">Unpaid</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="dropdown">
                                                                    <a className="icon-sm" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="ion-md-more"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">View</a>
                                                                        <a className="dropdown-item" href="#">Edit</a>
                                                                        <a className="dropdown-item text-danger" href="#">Delete</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        {/* <!-- End | Data List --> */}
                                                    </div>
                                                </div>
                                                {/* <!-- End | Dashboard Card --> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- End | Dashboard Content --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </Layout >
    )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps({ req }) {
    const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { req: req })) ?? null
    const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET' })) ?? []
    const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET' })) ?? []
    const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET' })) ?? []
    return {
        props: { user, mainMenus, flatMenus, themeSettings },
    }
}
