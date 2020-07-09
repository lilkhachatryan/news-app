import React, { Component } from "react";
import _ from "lodash"
import { getSources } from "../../utils/endpoints";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import ContactUs from "../ContactUs";

class Header extends Component {
    state = {
        isMobile: null,
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
        this.setState({ isMobile: window.innerWidth <= 576 });
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

    renderNavItems = () => {
        const { isMobile, sources } = this.state;

        if (isMobile) {
            return (
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.handleOpenModal} type="button" className="btn btn-primary">Contact us</button>
                    </li>
                </ul>
            )
        }

        return (
            <ul className="nav">
                {
                    sources.map(source => (
                        <li key={ source.id }
                            className="nav-item">
                            <Link to={`/category/${source.category}`}
                                  className="nav-link active">{ source.name }</Link>
                        </li>
                    ))
                }
                <li className="nav-item">
                    <input type="text" className="form-control mr-2" id="search"
                           placeholder="Search"
                           style={{ width: 150 }}/>
                </li>
                <li className="nav-item">
                    <button onClick={this.handleOpenModal} type="button" className="btn btn-primary">Contact us</button>
                </li>
            </ul>
        )
    };

    render() {
        const { show } = this.state;

        return (
            <>
                { this.renderNavItems() }
                <Modal show={show}
                       onClose={this.handleCloseModal}
                       title="Contact us">
                    <ContactUs
                        onModalClose={this.handleCloseModal} />
                </Modal>
            </>
        )
    }
}

export default Header;
