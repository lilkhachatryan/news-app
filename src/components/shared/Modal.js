import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalTitle } from '../../assets/styles/Modal.style';

class Modal extends Component {
    render() {
        const { show, title, onClose, children } = this.props;

        const handleOutsideClick = (e) => {
            if (e.target.id === 'modal') {
                onClose()
            }
        };

        return show
        ? createPortal(
                <ModalBackground onClick={handleOutsideClick} id="modal">
                    <ModalContainer ref="modal">
                        <ModalHeader>
                            <ModalTitle>{title}</ModalTitle>
                            <button onClick={onClose} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </ModalHeader>
                        <ModalBody>{children}</ModalBody>
                    </ModalContainer>
                </ModalBackground>,
                document.body
            )
        : null;
    }
}

export default Modal;
