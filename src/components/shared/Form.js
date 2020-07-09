import React, { Component } from "react";
import PropTypes from "prop-types"
import Submit from "./Submit";

class Form extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        submitComponent: PropTypes.element,
        initialData: PropTypes.object,
        submitText: PropTypes.string,
    };

    static defaultProps = {
        submitComponent: <Submit />,
        initialData: {},
        submitText: 'Submit',
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.data);
    };

    // onInputChange = (e) => {
    //     const { value, name } = e.target;
    //
    // };

    checkValidation = () => {

    };

    renderSubmitButton = () => {
        const { submitComponent: SubmitComponent, submitText } = this.props;

        return <SubmitComponent
                    onSubmit={this.onSubmit}
                    isValid={this.state.isValid}
                    value={submitText}
                    ref="submitBtn"
                />
        // return React.cloneElement(SubmitComponent, {
        //     onSubmit: this.onSubmit,
        //     isValid: this.state.isValid,
        //     value: submitText,
        //     ref: 'submitBtn'
        // })
    };

    state = {
        isValid: this.checkValidation(this.props.initialData),
        data: this.props.initialData,
    };

    render() {
        const { children: ChildrenComponent } = this.props;

        return(
            <>
                <form onSubmit={this.onSubmit}>
                    <ChildrenComponent />
                    { this.renderSubmitButton() }
                </form>
            </>
        )
    }
}
