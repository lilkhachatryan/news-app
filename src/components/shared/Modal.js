import React, { Component } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalTitle } from '../../assets/styles/Modal.style';

class Modal extends Component {
    render() {
        const { show, title, onClose, children, ...rest } = this.props;

        const handleOutsideClick = (e) => {
            // const domNode = ReactDOM.findDOMNode(ModalBackground);
            // console.log('domNode', domNode);
            // if (domNode && !domNode.contains(e.target)) {
            //     alert('You clicked outside of me!');
            //     // onClose()
            // }
        };

        return show
        ? createPortal(
                <ModalBackground onClick={handleOutsideClick}>
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
