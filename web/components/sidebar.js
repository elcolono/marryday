export default function Sidebar({ mainMenus }) {
    return (
        <aside id="sidebar">
            <div className="sidebar-header">
                <a href="javascript:void(0);" id="close_sidebar">&times;</a>
            </div>

            <nav id="nav">
                <ul>
                    {mainMenus[0].menu_items && mainMenus[0].menu_items.map((menuItem) => (
                        <li class="nav-item">
                            <a href={menuItem.link_page.slug} class="nav-link">{menuItem.link_text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
