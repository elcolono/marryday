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
  Spinner,
} from "reactstrap"

import data from "../../data/user-invoice.json"
import { GetServerSideProps } from "next"
import ApiService, { fetchAPIwithSSR } from "../../lib/api"

const UserInvoice = (props) => {
  const { bookingId } = props;


  const [booking, setBooking] = React.useState(undefined);

  React.useEffect(() => {
    ApiService.fetchBooking({ bookingId: bookingId }).then(response => {
      setBooking(response.data);
    }).catch(error => {
    })
  }, [])

  const payment_receipt_number = booking && booking.payment_intent.charges.data[0].receipt_number;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const payment_created = booking && format(new Date(booking.payment_intent.created * 1000), 'MMM dd, yyyy');
  const rent_object = booking && booking.booking.rent_object;
  const start = booking && new Date(booking.booking.start);
  const end = booking && new Date(booking.booking.end);
  const amount = booking && booking.payment_intent.amount;

  // Subtotal price calculation
  const subTotal = data.items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  )

  // Vat percentage
  const VAT = 21

  // Price total
  const total = subTotal * (1 + VAT / 100)

  // Vat part of total price
  const totalVAT = total - subTotal

  return (
    <section className="py-5 p-print-0">
      {booking &&
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
                <BreadcrumbItem>
                  <Link href="/user-account">
                    <a>Account</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Invoice {payment_receipt_number}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col lg="6" className="text-lg-right">
              {/* <Button color="primary" className="mr-2">
                <i className="far fa-file-pdf mr-2" /> Download PDF
              </Button> */}
              <Button color="primary" className="mr-2"onClick={() => window.print()}>
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
                  <h3 className="mb-0">Invoice {payment_receipt_number}</h3>
                  <p className="mb-0">Issued on {payment_created}</p>
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
                    <strong>Österreich</strong>
                  </p>
                </Col>
                <Col sm="6" className="pr-lg-4">
                  <h2 className="h6 text-uppercase mb-4">Customer</h2>
                  <h6 className="mb-1">James Brown</h6>
                  <p className="text-muted">
                    13/25 New Avenue
                  <br />
                  New Heaven
                  <br />
                  45Y 73J
                  <br />
                  England
                  <br />
                    <strong>Great Britain</strong>
                  </p>
                </Col>
              </Row>
              <Row className="mb-5">
                <Col md="6" className="pr-lg-3 text-sm">
                  <Row className="mb-2 mb-sm-1">
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
                  </Row>
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Payment method
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      Bank transfer
                  </Col>
                  </Row>
                </Col>
                <Col md="6" className="pl-lg-4 text-sm">
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Issued on
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      {data.issued}
                    </Col>
                  </Row>
                  <Row className="mb-2 mb-sm-1">
                    <Col sm="6" className="text-uppercase text-muted">
                      Due on
                  </Col>
                    <Col sm="6" className="text-sm-right">
                      {data.due}
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
                    <td className="font-weight-bold">{rent_object}</td>
                    <td>{format(start, 'MMM dd, yyyy HH:mm')} bis {format(end, 'MMM dd, yyyy HH:mm')}</td>
                    <td className="text-right">€ {amount}</td>
                    <td className="text-center">1</td>
                    <td className="text-right">
                      € {amount}
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
                          ${subTotal.toLocaleString("en-US")}
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="font-weight-bold">VAT ({VAT}%)</td>
                        <td className="text-right">${totalVAT.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-uppercase font-weight-bold">Total</td>
                        <td className="text-right font-weight-bold">
                          ${(+total.toFixed(2)).toLocaleString("en-US")}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="bg-gray-100 p-5 px-print-0 border-0 text-right text-sm">
              <p className="mb-0">Thank you for you business. Directory, Inc.</p>
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
  return {
    props: {
      // booking,
      bookingId: params.bookingId,
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms | Category - Map on the top",
    },
  }
}
