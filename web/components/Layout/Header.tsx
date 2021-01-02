import React from "react"
import Link from "next/link"
import Router from "next/router"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap"

import UseWindowSize from "../../hooks/UseWindowSize"
import ActiveLink from "../ActiveLink"

const Header = (props) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState({})
  const [searchFocus, setSearchFocus] = React.useState(false)

  const size = UseWindowSize()
  const onFocus = () => setSearchFocus(!searchFocus)
  const { mainMenus } = props


  const onLinkClick = (parent) => {
    size.width < 991 && setCollapsed(!collapsed)
    // setParentName(parent)
  }

  // highlight not only active dropdown item, but also its parent, i.e. dropdown toggle
  // const highlightDropdownParent = () => {
  //   menu.map((item) => {
  //     item.dropdown &&
  //       item.dropdown.map((dropdownLink) => {
  //         dropdownLink.link &&
  //           dropdownLink.link === Router.route &&
  //           setParentName(item.title)
  //         dropdownLink.links &&
  //           dropdownLink.links.map(
  //             (link) => link.link === Router.route && setParentName(item.title)
  //           )
  //       })
  //     item.megamenu &&
  //       item.megamenu.map((megamenuColumn) =>
  //         megamenuColumn.map((megamenuBlock) =>
  //           megamenuBlock.links.map((dropdownLink) => {
  //             if (dropdownLink.link === Router.route) {
  //               props
  //             }
  //           })
  //         )
  //       )
  //     item.link === Router.route && setParentName(item.title)
  //   })
  // }

  // React.useEffect(highlightDropdownParent, [])
  return (
    <header
      className={`header ${props.headerClasses ? props.headerClasses : ""}`}
    >
      <Navbar
        color={props.nav.color ? props.nav.color : "white"}
        light={props.nav.light && true}
        dark={props.nav.dark && true}
        fixed={props.nav.fixed ? props.nav.fixed : "top"}
        expand="lg"
        className={props.nav.classes ? props.nav.classes : ""}
      >
        <Container fluid={true}>
          <div className="d-flex align-items-center">
            {/* logo */}
            <Link href="/" passHref>
              <a className="py-1 navbar-brand">
                <img
                  src="/assets/img/logos/mowo-spaces-logo.png"
                  // width="138"
                  height="35"
                  alt="Directory logo"
                />
              </a>
            </Link>

            {/* search form */}
            <Form id="search" className="form-inline d-none d-sm-flex">
              <div
                className={`input-label-absolute input-label-absolute-left input-reset input-expand ml-lg-2 ml-xl-3 ${searchFocus ? "focus" : ""
                  }`}
              >
                <Label for="search_search" className="label-absolute">
                  <i className="fa fa-search"></i>
                  <span className="sr-only">What are you looking for?</span>
                </Label>
                <Input
                  id="search_search"
                  placeholder="Search"
                  aria-label="Search"
                  bsSize="sm"
                  className="border-0 shadow-0 bg-gray-200"
                  onFocus={onFocus}
                  onBlur={() => setTimeout(() => onFocus(), 333)}
                />
                <button type="reset" className="btn btn-sm btn-reset">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </Form>
          </div>

          {/* mobile navbar */}
          <NavbarToggler
            onClick={() => setCollapsed(!collapsed)}
            className="navbar-toggler-right"
          >
            <i className="fa fa-bars"></i>
          </NavbarToggler>
          <Collapse isOpen={collapsed} navbar>
            {/* mobile search form */}
            <Form
              id="searchcollapsed"
              className="form-inline mt-4 mb-2 d-sm-none"
            >
              <div
                className={`input-label-absolute input-label-absolute-left input-reset w-100 ${searchFocus ? "focus" : ""
                  }`}
              >
                <Label for="searchcollapsed_search" className="label-absolute">
                  <i className="fa fa-search"></i>

                  <span className="sr-only">What are you looking for?</span>
                </Label>
                <Input
                  id="searchcollapsed_search"
                  placeholder="Search"
                  aria-label="Search"
                  bsSize="sm"
                  className="border-0 shadow-0 bg-gray-200"
                  onFocus={onFocus}
                  onBlur={() => setTimeout(() => onFocus(), 333)}
                />
                <Button
                  type="reset"
                  size="sm"
                  color="deoco"
                  className="btn-reset"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </Form>

            {/*  MAIN Navigation */}
            <Nav navbar className="ml-auto">
              {mainMenus && mainMenus[0].menu_items &&
                mainMenus[0].menu_items.map((item) => <NavItem
                  key={item.link_text}
                  className={
                    item.button
                      ? "mt-3 mt-lg-0 ml-lg-3 d-lg-none d-xl-inline-block"
                      : ""
                  }
                >
                  {item.button ? (
                    item.showToLoggedUser !== false && (
                      <ActiveLink activeClassName="active" href={item.link}>
                        <a
                          className="btn btn-primary"
                          onClick={() => onLinkClick(item.title)}
                        >
                          {item.title}
                        </a>
                      </ActiveLink>
                    )
                  ) : (
                      <ActiveLink
                        activeClassName="active"
                        href={item.link_page.slug}
                        passHref
                      >
                        <NavLink onClick={() => onLinkClick(item.title)}>
                          {item.link_text}
                        </NavLink>
                      </ActiveLink>
                    )}
                </NavItem>)}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
