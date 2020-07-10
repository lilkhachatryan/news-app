import React, { Component } from "react";
import { getSources } from "../utils/endpoints";
import Modal from "../components/shared/Modal";
import CategoryDetails from "../components/CategoryDetails";

class Category extends Component {
    state = {
      categories: [],
      category: {},
      params: {
          category: null
      },
      show: false,
      _loading: false,
      _error: false
    };

    componentDidMount() {
        this.getCategoriesFromServer()
    }

    getCategoriesFromServer = () => {
        const { match } = this.props;
        this.setState({ category: match.params.id, _loading: true });

        getSources({ category: match.params.id })
            .then(res => {
                this.setState({ categories: res.data.sources, _loading: false })
            })
            .catch((e) => {
                this.setState({ _error: true, _loading: false })
            })
    };

    handleCloseModal = () => {
        this.setState({ show: false })
    };

    handleOpenModal = (category) => {
        this.setState({ show: true, category })
    };

    formatDescription = (description) => {
        return description.slice(0, 140) + (description.length > 140 ? '...' : '')
    };

    render() {
        const { categories, show, category, _error, _loading } = this.state;

        if (_loading) return (<div>Loading...</div>);

        if (_error) return (<div>Something went wrong</div>);

        return (
            <>
                <div>Category - {this.props.match.params.id}</div>
                <hr />
                <br />
                {
                    categories.map(category => (
                        <div key={category.id + 'category'}
                            className="jumbotron">
                            <div className="mb-3">{ category.name }</div>
                            <a href={category.url}
                               target="_blank"
                               rel="noopener noreferrer">{ category.url }</a>
                            <div>{ this.formatDescription(category.description)}</div>
                            <button onClick={() => this.handleOpenModal(category)}
                                    type="button"
                                    className="btn btn-link mt-4">See more</button>
                        </div>
                    ))
                }
                <Modal show={show}
                       onClose={this.handleCloseModal}
                       title="Category details">
                    <CategoryDetails category={category} />
                </Modal>
            </>
        )
    }
}

export default Category;
