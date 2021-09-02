import React from "react";
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'

const CustomModal = (props) => {
    const [modal, setModal] = React.useState(false)

    const onClick = () => {
        setModal(!modal)
    }

    const onClickAccept = () => {
        setModal(!modal)
        props.onAccept()
    }

    return (
        <>
            <Button color="primary" onClick={onClick}>Launch demo modal</Button>
            <Modal isOpen={modal} toggle={onClick} fade>
                <ModalBody>
                    <Button color="ooo" onClick={onClick} className="close"><span aria-hidden="true">×</span></Button>
                    <h2>Modal title</h2>
                    <p>Modal text</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onClickAccept}>Save changes</Button>
                    <Button color="outline-muted" onClick={onClick}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CustomModal