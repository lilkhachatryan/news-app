import React, { Component } from "react";
import FormField from "./shared/FormField";
import isEmail from 'validator/lib/isEmail';

class ContactUs extends Component{
    state = {
        fields: {
            name: '',
            email: '',
            message: ''
        },
        fieldErrors: {}
    };

    onInputChange = ({ name, value, error }) => {
        const { fields, fieldErrors } = this.state;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({ fields, fieldErrors })
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.validate()) return;

        this.props.onModalClose();
        this.setState({
            fields: {
                name: '',
                email: '',
                message: ''
            },
        });
    };

    validate = () => {
        const { fields, fieldErrors } = this.state;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!fields.name) return true;
        if (!fields.email) return true;
        if (!fields.message) return true;
        return !!errMessages.length;

    };

    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <FormField value={this.state.fields.name}
                                   onChange={this.onInputChange}
                                   validate={(val) => (val ? false : 'Name Required')}
                                   id="inputName"
                                   name="name"
                                   placeholder="Type your name"/>
                    </div>
                    <div className="form-group col-md-6">
                        <FormField value={this.state.fields.email}
                                   onChange={this.onInputChange}
                                   validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
                                   type="email"
                                   id="inputEmail"
                                   name="email"
                                   placeholder="Type your email" />
                    </div>
                </div>
                <div className="form-group">
                    <FormField value={this.state.fields.message}
                               onChange={this.onInputChange}
                               validate={(val) => (val ? false : 'Message Required')}
                               id="inputMessage"
                               name="message"
                               placeholder="Type your message"
                               fieldType="textarea"
                               rows={5} />
                </div>
                <button onClick={this.onSubmit}
                        disabled={this.validate()}
                        type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default ContactUs;
