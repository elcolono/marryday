export default function Sidebar({ mainMenus }) {

    const handleMenuIconClicked = () => {
        javascript: void (0);
    }
    
    return (
        <aside id="sidebar">
            <div className="sidebar-header">
                <a onClick={handleMenuIconClicked} id="close_sidebar">&times;</a>
            </div>

            <nav id="nav">
                <ul>
                    {mainMenus[0].menu_items && mainMenus[0].menu_items.map((menuItem, i) => (
                        <li key={i} className="nav-item">
                            <a href={menuItem.link_page.slug} className="nav-link">{menuItem.link_text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
