import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalTitle } from '../../assets/styles/Modal.style';

class Modal extends Component {
    render() {
        const { show, title, onClose, children, ...rest } = this.props;

        return show
        ? createPortal(
                <ModalBackground>
                    <ModalContainer>
                        <ModalHeader>
                            <ModalTitle>{title}</ModalTitle>
                            <div
                                onClick={onClose}
                            >close</div>
                        </ModalHeader>
                        {/*<ModalBody>*/}
                        {/*    <ChildrenComponent { ...rest }/>*/}
                        {/*</ModalBody>*/}
                        <ModalBody>{children}</ModalBody>
                    </ModalContainer>
                </ModalBackground>,
                document.body
            )
        : null;
    }
}

export default Modal;
