import React, { Component } from "react";
import _ from "lodash"
import { getSources } from "../../utils/endpoints";
import { NavLink, withRouter } from "react-router-dom";
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
        show: false,
        search: ''
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

    onChangeSearch = () => {
        this.props.history.push(`/search?q=${this.state.search}`);
    };

    debouncedHandleResize =  _.debounce(this.handleResize, 500);
    debounceSearch = _.debounce(this.onChangeSearch, 500);

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
        // if (e.key === 'Enter') {
        //     this.props.history.push(`/search?q=${e.target.value}`);
        // }
        this.setState({ search: e.target.value }, this.debounceSearch);
        // this.props.history.push(`/search?q=${e.target.value}`);
    };

    onToggleMenu = () => {
        this.setState((prevState => {
            return { isOpen: !prevState.isOpen }
        }))
    };

    handleNavClick = () => {
        this.setState({ isOpen: false })
    };

    renderCategories = () => {
        return this.state.sources.map(source => (
            <li key={ source.id }
                className="nav-item">
                <NavLink
                    to={`/category/${source.category}`}
                    onClick={this.handleNavClick}
                    className="nav-link"
                    activeClassName='active'>{ source.name }</NavLink>
            </li>
        ))
    };

    renderNavItems = () => {
        const { isMobile, isOpen, search } = this.state;

        if (isMobile) {
            return (
                <>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/home"
                                className="nav-link"
                                activeClassName='active'>Home</NavLink>
                        </li>
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
                    <li className="nav-item">
                        <NavLink
                            to="/home"
                            className="nav-link"
                            activeClassName='active'>Home</NavLink>
                    </li>
                    { this.renderCategories()}
                </ul>
                <input onChange={this.handleKeyDown}
                       value={search}
                       type="text"
                       className="form-control mr-2"
                       id="search"
                       placeholder="Search"
                       style={{ width: 200 }}/>
                <button onClick={this.handleOpenModal} type="button" className="btn btn-info">Contact us</button>
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

export default withRouter(Header);
