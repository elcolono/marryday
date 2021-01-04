import React, { useState } from 'react';
import { Modal, ModalHeader, Navbar, Button, NavbarBrand } from 'reactstrap';



const BottomNav = (props) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const { children } = props;
    return (<div>
        <Navbar
            color="white"
            light
            fixed="bottom"
            className="shadow"
        >
            <NavbarBrand href="/" className="mr-auto">MoWo Wien II</NavbarBrand>
            <Button onClick={toggleModal} color="primary" className="mr-2">Buchen</Button>
            {/* <Collapse isOpen={!collapsed} navbar>
                <div>
                    Lorem ipsum
                </div>
            </Collapse> */}
        </Navbar>
        <Modal centered={true} isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
            {children}
        </Modal>
    </div>)
}

export default BottomNav;