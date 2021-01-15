import React from "react"
import Link from "next/link"
import { Container, Row, Col, Form, Input, Button, Badge } from "reactstrap"

import footerContent from "../../data/footer.json"

const Footer = ({ flatMenus, themeSettings }) => {
  return (
    <footer className="position-relative z-index-10 d-print-none">
      <div className="py-6 bg-gray-200 text-muted">

        <Container>
          <Row>

            {flatMenus &&
              flatMenus.map((menu) => {
                if (menu.handle == "social") return <Col
                  key={menu.title}
                  lg={4}
                  className="mb-5 mb-lg-0"
                >
                  <div className="font-weight-bold text-uppercase text-dark mb-3">
                    {menu.title}
                  </div>
                  {menu.heading && (
                    <p>
                      {menu.heading}
                    </p>
                  )}
                  <ul className="list-inline">
                    {menu.menu_items.map((item, i) => (
                      <li key={i} className="list-inline-item">
                        <a
                          href={item.link_url}
                          target="_blank"
                          className="text-muted text-hover-primary"
                        >
                          <i className={`fab fa-${item.link_text}`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Col>
              })}

            {flatMenus &&
              flatMenus.map((menu) => {
                if (menu.handle == "links_useful") return <Col
                  key={menu.title}
                  lg={2}
                  md={6}
                  className="mb-5 mb-lg-0"
                >
                  <div className="font-weight-bold text-uppercase text-dark mb-3">
                    {menu.title}
                  </div>
                  {menu.heading && (
                    <p>
                      {menu.heading}
                    </p>
                  )}
                  <ul className="list-unstyled">
                    {menu.menu_items.map((item, i) => (
                      <li key={i}>
                        <Link href={item.link_page.slug}>
                          <a className="text-muted">
                            {item.link_text}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>

                </Col>
              })}

            {flatMenus &&
              flatMenus.map((menu) => {
                if (menu.handle == "links_legal") return <Col
                  key={menu.title}
                  lg={2}
                  md={6}
                  className="mb-5 mb-lg-0"
                >
                  <div className="font-weight-bold text-uppercase text-dark mb-3">
                    {menu.title}
                  </div>
                  {menu.heading && (
                    <p>
                      {menu.heading}
                    </p>
                  )}
                  <ul className="list-unstyled">
                    {menu.menu_items.map((item, i) => (
                      <li key={i}>
                        <Link href={item.link_page.slug}>
                          <a className="text-muted">
                            {item.link_text}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Col>
              })}


            {flatMenus &&
              flatMenus.map((menu) => {
                if (menu.handle == "contact") return <Col
                  key={menu.title}
                  lg={4}
                  className="mb-5 mb-lg-0"
                >
                  <div className="font-weight-bold text-uppercase text-dark mb-3">
                    {menu.title}
                  </div>
                  {menu.heading && (
                    <p>
                      {menu.heading}
                    </p>
                  )}
                  <ul className="list-inline">
                    {menu.menu_items.map((item, i) => (
                      <li key={i} className="list-inline-item">
                        <a
                          href={item.link_url}
                          className="text-muted text-hover-primary"
                        >
                          <i className={`fa fa-${item.handle}`} /> {item.link_text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Col>
              })}

          </Row>
        </Container>
      </div>
      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
        <Container>
          <Row className="align-items-center">
            <Col md="6" className="text-center text-md-left">
              <p className="text-sm mb-md-0">
                © 2021, MoWo Spaces GesbR. All rights reserved.
              </p>
            </Col>
            <Col md="6">
              <ul className="list-inline mb-0 mt-2 mt-md-0 text-center text-md-right">
                <li className="list-inline-item">
                  <img
                    width="32"
                    height="32"
                    src="/assets/svg/visa.svg"
                    alt="..."
                    className="w-2rem"
                  />
                </li>
                <li className="list-inline-item">
                  <img
                    src="/assets/svg/mastercard.svg"
                    width="32"
                    height="32"
                    alt="..."
                    className="w-2rem"
                  />
                </li>
                <li className="list-inline-item">
                  <img
                    src="/assets/svg/paypal.svg"
                    width="32"
                    height="32"
                    alt="..."
                    className="w-2rem"
                  />
                </li>
                <li className="list-inline-item">
                  <img
                    src="/assets/svg/western-union.svg"
                    width="32"
                    height="32"
                    alt="..."
                    className="w-2rem"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
