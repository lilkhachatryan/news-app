import React, { Component } from "react";
import PropTypes from "prop-types"

class FormField extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
        className: PropTypes.string,
        rows: PropTypes.number,
        fieldType: PropTypes.oneOf(['input', 'textarea'])
    };

    static defaultProps = {
        fieldType: 'input'
    };

    state = {
        value: this.props.value,
        error: false
    };

    handleChange = (e) => {
        const { validate, name, onChange } = this.props;
        const value = e.target.value;
        const error = validate ? validate(value) : false;

        this.setState({ value, error });
        onChange({ name, value, error });
    };

    static getDerivedStateFromProps (nextProps) {
        return { value: nextProps.value }
    }

    render() {
        const {
            fieldType: FieldComponent,
                onChange,
                validate,
                value,
                id,
                name,
        ...rest
        } = this.props;

        return (
            <>
                <label htmlFor={id}>{name}</label>
                <FieldComponent onChange={this.handleChange}
                                className="form-control"
                                id={id}
                                value={this.state.value}
                                {...rest} />
                <div className="text-error">{ this.state.error }</div>
            </>
        )
    }
}

// FormField.propTypes = {
//     placeholder: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     value: PropTypes.string,
//     validate: PropTypes.func,
//     onChange: PropTypes.func.isRequired,
//     type: PropTypes.string,
//     className: PropTypes.string,
//     rows: PropTypes.number,
//     fieldType: PropTypes.oneOf(['input', 'textarea'])
// };
//
// FormField.defaultProps = {
//     fieldType: 'input'
// };

export default FormField;
