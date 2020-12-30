import React from 'react';
import Link from 'next/link';
import { Button, Col } from 'reactstrap';

function CheckoutSuccess() {
    return (
        <React.Fragment>
            <Col lg="12" className="p-4">
                <p className="subtitle text-primary">MoWo Space</p>
                <h1 className="h2 mb-5">
                    Buchung erfolgreich
                </h1>
                <div className="text-block">
                    <p className="text-muted">Thank you for your booking, Ondrej.</p>
                    <p className="text-muted mb-5">Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                    <p className="text-center mb-5">
                        <Link href="buchung" passHref>
                            <Button color="primary" className="mx-2 mb-2">
                                <i className="far fa-file mr-2" />
                                Buchung anzeigen
                            </Button>
                        </Link>
                        <Link href="/rechung" passHref>
                            <Button color="outline-muted" className="mb-2">
                                Rechnung
                            </Button>
                        </Link>
                        <Link href="link">
                            <a className="d-block">Erneut buchen</a>
                        </Link>

                    </p>
                    <p className="mb-5 text-center">
                        <img
                            src="/assets/img/illustration/undraw_celebration_0jvk.svg"
                            width={400}
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