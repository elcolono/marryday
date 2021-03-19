import React from "react"
import Link from "next/link"

import format from 'date-fns/format'

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  CardFooter,
} from "reactstrap"

import { GetServerSideProps } from "next"
import { fetchAPIwithSSR } from "../../lib/api"
import Decimal from 'decimal.js';


const UserInvoice = (props) => {

  const { payment } = props;


  // Price total
  const total = new Decimal(payment.amount).dividedBy(100)

  // Subtotal price calculation
  const subTotal = new Decimal(payment.amount).mul(0.8).dividedBy(100)

  // Vat part of total price
  const totalVAT = total.minus(subTotal)

  return (
    <section className="py-5 p-print-0">
      {/* <pre>{JSON.stringify(payment, null, 2)}</pre> */}
      {payment &&
        <Container>
          {/* <pre>{JSON.stringify(booking, null, 4)}</pre> */}
          <Row className="mb-4 d-print-none">
            <Col lg="6">
              <Breadcrumb listClassName="pl-0 justify-content-start">
                <BreadcrumbItem>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Invoice {payment.invoice_no}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col lg="6" className="text-lg-right">
              {/* <Button color="primary" className="mr-2">
                <i className="far fa-file-pdf mr-2" /> Download PDF
              </Button> */}
              <Button color="primary" className="mr-2" onClick={() => window.print()}>
                <i className="fas fa-print mr-2" /> Drucken / Speichern
            </Button>
            </Col>
          </Row>
          <Card className="border-0 shadow shadow-print-0">
            <CardHeader className="bg-gray-100 p-5 border-0 px-print-0">
              <Row>
                <Col md="6" className="d-flex align-items-center mb-4 mb-md-0">
                  <img
                    src="/assets/img/logos/mowo-spaces-logo.png"
                    alt="Directory"
                    height="60" />
                </Col>
                <Col md="6" className="text-md-right">
                  <h3 className="mb-0">Invoice {payment.invoice_no}</h3>
                  <p className="mb-0">Issued on {format(new Date(payment.invoice_date), 'MMM dd, yyyy')} </p>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-5 p-print-0">
              <Row className="mb-4">
                <Col sm="6" className="pr-lg-3">
                  <h2 className="h6 text-uppercase mb-4">Supplier</h2>
                  <h6 className="mb-1">MoWo Spaces GesbR</h6>
                  <p className="text-muted">
                    2344 Maria Enzersdorf
                  <br />
                    <strong>Austria</strong>
                  </p>
                </Col>
                <Col sm="6" className="pr-lg-4">
                  <h2 className="h6 text-uppercase mb-4">Customer</h2>
                  <h6 className="mb-1">Anonymous</h6>
                  {/* <p className="text-muted">
                    13/25 New Avenue
                  <br />
                  New Heaven
                  <br />
                  45Y 73J
                  <br />
                  England
                  <br />
                    <strong>Great Britain</strong>
                  </p> */}
                </Col>
              </Row>
              <Row className="mb-5">
                <Col md="6" className="pr-lg-3 text-sm">
                  {/* <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Bank account
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      hello@bootstrapious.com
                  </Col>
                  </Row>
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Reference
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      {data.number}
                    </Col>
                  </Row> */}
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Payment method
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      Credit card
                  </Col>
                  </Row>
                </Col>
                <Col md="6" className="pl-lg-4 text-sm">
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Issued on
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      {format(new Date(payment.invoice_date), 'MMM dd, yyyy')}
                    </Col>
                  </Row>
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Due on
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      {format(new Date(payment.invoice_date), 'MMM dd, yyyy')}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Table responsive className="text-sm mb-5" striped>
                <thead className="bg-gray-200">
                  <tr className="border-0">
                    <th className="center">#</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th className="text-right">Price</th>
                    <th className="center">Qty</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td className="font-weight-bold">{payment.booking.rent_object}</td>
                    <td>{format(new Date(payment.booking.start), 'MMM dd, yyyy HH:mm')} bis {format(new Date(payment.booking.end), 'MMM dd, yyyy HH:mm')}</td>
                    <td className="text-right">€ {total.toFixed(2)}</td>
                    <td className="text-center">1</td>
                    <td className="text-right">
                      € {total.toFixed(2)}
                    </td>
                  </tr>
                  {/* {data.items.map((item, index) => (
                    // Map through invoice items
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="font-weight-bold">{item.name}</td>
                      <td>{item.description}</td>
                      <td className="text-right">${item.price.toFixed(2)}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </Table>
              <Row>
                <Col sm="7" lg="5" xl="4" className="ml-auto">
                  <Table>
                    <tbody>
                      <tr className="text-sm">
                        <td className="font-weight-bold">Subtotal</td>
                        <td className="text-right">
                          € {subTotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="font-weight-bold">VAT (20%)</td>
                        <td className="text-right">€ {totalVAT.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-uppercase font-weight-bold">Total</td>
                        <td className="text-right font-weight-bold">
                          € {total.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="bg-gray-100 p-5 px-print-0 border-0 text-right text-sm">
              <p className="mb-0">Thank you for you business. MoWo Spaces GesbR.</p>
            </CardFooter>
          </Card>
        </Container>}
    </section>
  )
}

export default UserInvoice

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  // const booking = (await fetchAPIwithSSR(`/api/v1/cowork/booking/${params.bookingId}`, { method: 'GET', req: req })) ?? []
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  const payment = (await fetchAPIwithSSR(`/api/v1/payments/payment/${params.paymentUuid}`, { method: 'GET', req: req })) ?? []

  return {
    props: {
      payment,
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Bezahlung",
    },
  }
}
