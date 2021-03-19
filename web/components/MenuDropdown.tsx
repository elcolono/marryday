import React from "react"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"

import ActiveLink from "./ActiveLink"
import Image from "./CustomImage"
import UseWindowSize from "../hooks/UseWindowSize"
import Avatar from "@material-ui/core/Avatar"

export default function MenuDropdown(props) {

    const { item } = props;

    const [collapsed, setCollapsed] = React.useState(false)
    const [dropdownOpen, setDropdownOpen] = React.useState({})
    const [dropdownAnimate, setDropdownAnimate] = React.useState({})
    const [parentName, setParentName] = React.useState(false)

    const size = UseWindowSize()

    const toggleDropdown = (name) => {
        setDropdownOpen({ ...dropdownOpen, [name]: !dropdownOpen[name] })
    }
    const onLinkClick = (parent) => {
        size.width < 991 && setCollapsed(!collapsed)
        setParentName(parent)
    }

    return (
        <Dropdown
            nav
            inNavbar
            key={item.title}
            className={item.type === "avatar" ? "ml-lg-3" : ""}
            isOpen={dropdownOpen[item.title]}
            toggle={() => toggleDropdown(item.title)}
        >
            <DropdownToggle
                nav
                style={item.type === "avatar" && { padding: 0 }}
                onClick={() =>
                    setDropdownAnimate({
                        ...dropdownAnimate,
                        [item.title]: !dropdownOpen[item.img],
                    })
                }
            >
                {item.type === "avatar" ? (
                    <div className="mr-2 avatar-border-white avatar avatar-sm overflow-hidden">
                        {item.img ?
                            <Image
                                src={`/content${item.img}`}
                                width={36}
                                height={36}
                                layout="fixed"
                                alt={item.title}
                            /> :
                            <Avatar>O</Avatar>
                        }
                    </div>
                ) : (
                    item.title
                )}
            </DropdownToggle>
            <DropdownMenu
                className={
                    dropdownAnimate[item.title] === false ? "hide" : ""
                }
                right
            >
                {item.dropdown &&
                    item.dropdown.map((dropdownItem) => (
                        <ActiveLink
                            key={dropdownItem.title}
                            activeClassName="active"
                            href={dropdownItem.link}
                            passHref
                        >
                            <DropdownItem
                                onClick={() => onLinkClick(item.title)}
                            >
                                {dropdownItem.title}
                            </DropdownItem>
                        </ActiveLink>
                    ))}
            </DropdownMenu>
        </Dropdown>

    )
}