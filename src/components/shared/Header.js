import React, { Component } from "react";
import _ from "lodash"
import { getSources } from "../../utils/endpoints";
import { Link, Redirect } from "react-router-dom";
import Modal from "./Modal";
import ContactUs from "../ContactUs";

class Header extends Component {
    state = {
        isMobile: null,
        isOpen: false,
        sources: [],
        params: {
            pageSize: 4
        },
        show: false
    };


    componentDidMount() {
        window.addEventListener('resize', this.debouncedHandleResize);
        this.handleResize();
        this.getSourcesFromServer()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.debouncedHandleResize);
    }

    handleResize = () => {
        this.setState({ isMobile: window.innerWidth <= 768, isOpen: false });
    };

    debouncedHandleResize =  _.debounce(this.handleResize, 500);

    getSourcesFromServer = () => {
        getSources({ ...this.state.params })
            .then(res => {
                let non_duplicated_data = _.uniqBy(res.data.sources, 'category');

                this.setState({ sources: non_duplicated_data.slice(0, 4) })
            })
    };

    handleCloseModal = () => {
        this.setState({ show: false })
    };

    handleOpenModal = () => {
        this.setState({ show: true })
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.history.push(`/search?q=${e.target.value}`);
        }
    };

    onToggleMenu = () => {
        this.setState((prevState => {
            return { isOpen: !prevState.isOpen}
        }))
    };

    renderCategories = () => {
        return this.state.sources.map(source => (
            <li key={ source.id }
                className="nav-item">
                <Link to={`/category/${source.category}`}
                      className="nav-link">{ source.name }</Link>
            </li>
        ))
    };

    renderNavItems = () => {
        const { isMobile, isOpen } = this.state;

        if (isMobile) {
            return (
                <>
                    <ul className="navbar-nav">
                        { isOpen ? this.renderCategories() : null }
                    </ul>
                    <button onClick={this.onToggleMenu} className="navbar-toggler ml-auto align-self-baseline" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </>
            )
        }

        return (
            <>
                <ul className="nav">
                    { this.renderCategories()}
                </ul>
                <input onKeyDown={this.handleKeyDown}
                       type="text"
                       className="form-control mr-2"
                       id="search"
                       placeholder="Search"
                       style={{ width: 200 }}/>
                <button onClick={this.handleOpenModal} type="button" className="btn btn-primary">Contact us</button>
            </>
        )
    };

    render() {
        const { show } = this.state;

        return (
            <div className="fixed-top">
                <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                    { this.renderNavItems() }
                </nav>
                <Modal show={show}
                       onClose={this.handleCloseModal}
                       title="Contact us">
                    <ContactUs
                        onModalClose={this.handleCloseModal} />
                </Modal>
            </div>
        )
    }
}

export default Header;
