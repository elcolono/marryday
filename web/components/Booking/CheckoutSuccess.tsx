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
                    Buchung war erfolgreich
                </h1>
                <div className="text-block">
                    <p className="text-muted">Thank you for your booking, Ondrej.</p>
                    <p className="text-muted mb-5">Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                    <p className="text-center mb-5">
                        <Link href="buchung" passHref>
                            <a>
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