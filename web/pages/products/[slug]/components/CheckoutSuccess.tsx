import React from 'react';
import Link from 'next/link';
import { Button, Col } from 'reactstrap';

function CheckoutSuccess({ createdBooking }) {
    return (
        <React.Fragment>
            <Col lg="12" className="p-4">
                {/* <pre>{JSON.stringify(createdBooking, null, 2)}</pre> */}
                <p className="subtitle text-primary">MoWo Space</p>
                <h1 className="h2 mb-5">
                    Erfolgreiche Buchung
                </h1>
                {/* {JSON.stringify(createdBooking)} */}
                <div className="text-block">
                    <p className="text-muted">Vielen Dank für deine Buchung.</p>
                    <p className="text-muted">In Kürze erhälst du eine Bestätigungsmail mit deinem Buchungs- und Rechnungslink. Hast du weitere Fragen zu deiner Buchung oder einer Stornierung melde dich bitte unter:
                    {' '}<a href="mailto:contact@mowo.space">contact@mowo.space</a>.</p>
                    <p className="text-muted mb-5">Vielen Dank, dein MoWo Team.</p>
                    <p className="text-center mb-5">
                        <Link href={`/bookings/${createdBooking.booking.uuid}`} passHref>
                            <a target={"_blank"}>
                                <Button color="primary" className="mx-2 mb-2">
                                    <i className="far fa-file mr-2" />
                                Buchung anzeigen
                                </Button>
                            </a>
                        </Link>
                        <Link href={`/payments/${createdBooking.uuid}`} passHref>
                            <a target={"_blank"}>
                                <Button color="outline-muted" className="mb-2">
                                    Rechnung
                                </Button>
                            </a>
                        </Link>
                    </p>
                    <p className="mb-5 text-center">
                        <img
                            src="/assets/img/illustration/undraw_celebration_0jvk.svg"
                            width={200}
                            height={279}
                            // layout="intrinsic"
                            alt=""
                            className="img-fluid"
                            sizes="(max-width: 576px) 100vw, 530px"
                        />
                    </p>
                </div>
            </Col>
        </React.Fragment>
    );
}

export default CheckoutSuccess;