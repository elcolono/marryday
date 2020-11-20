export default function Sidebar() {
    return (
        <aside id="sidebar">
            <div className="sidebar-header">
                <a href="javascript:void(0);" id="close_sidebar">&times;</a>
            </div>

            <nav id="nav">
                <ul>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Home</a>
                        <ul className="nav-sub-menu">
                            <li><a href="index.html">Home v1</a></li>
                            <li><a href="index2.html">Home v2</a></li>
                            <li><a href="index3.html">Home v3</a></li>
                        </ul>
                    </li>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Listings</a>
                        <ul className="nav-sub-menu">
                            <li><a href="list-sidebar.html">List view (sidebar)</a></li>
                            <li><a href="list-full-width.html">List view (full width)</a></li>
                            <li><a href="list-map.html">List view (map)</a></li>
                            <li><a href="grid-sidebar.html">Grid view (sidebar)</a></li>
                            <li><a href="grid-full-width.html">Grid view (full width)</a></li>
                            <li><a href="grid-map.html">Grid view (map)</a></li>
                            <li><a href="list-details.html">List details</a></li>
                        </ul>
                    </li>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Admin Panel</a>
                        <ul className="nav-sub-menu">
                            <li><a href="dashboard.html">Dashboard</a></li>
                            <li><a href="invoice.html">Invoice</a></li>
                            <li><a href="booking.html">Booking</a></li>
                            <li><a href="wallet.html">Wallet</a></li>
                            <li><a href="reviews.html">Reviews</a></li>
                            <li><a href="add-listing.html">Add listing</a></li>
                            <li><a href="my-listing.html">My listings</a></li>
                            <li><a href="notification.html">Notification</a></li>
                            <li><a href="profile.html">Profile</a></li>
                        </ul>
                    </li>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Pages</a>
                        <ul className="nav-sub-menu">
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="coming-soon.html">Coming soon</a></li>
                            <li><a href="pricing.html">Pricing</a></li>
                            <li><a href="faqs.html">FAQs</a></li>
                            <li><a href="404.html">404</a></li>
                        </ul>
                    </li>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Blog</a>
                        <ul className="nav-sub-menu">
                            <li><a href="blog-list.html">Blog lists</a></li>
                            <li><a href="blog-details.html">Blog details</a></li>
                        </ul>
                    </li>
                    <li className="nav-item nav-has-sub">
                        <a href="javascript:void(0);">Other Pages</a>
                        <ul className="nav-sub-menu">
                            <li><a href="guide.html">Style guide</a></li>
                            <li><a href="elements.html">Elements</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
