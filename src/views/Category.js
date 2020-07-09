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
      show: false
    };

    componentDidMount() {
        this.getCategoriesFromServer()
    }

    getCategoriesFromServer = () => {
        const { match } = this.props;
        this.setState({ category: match.params.id });
        getSources({ category: match.params.id })
            .then(res => {
                this.setState({ categories: res.data.sources })
            })
    };

    handleCloseModal = () => {
        this.setState({ show: false })
    };

    handleOpenModal = (category) => {
        this.setState({ show: true, category })
    };

    render() {
        const { match } = this.props;
        const { categories, show, category } = this.state;

        return (
            <>
                <div>category id param - { match.params.id }</div>
                <hr />
                <br />
                {
                    categories.map(category => (
                        <div key={category.id + 'category'}>
                            <div>{ category.name }</div>
                            <a href={category.url} target="_blank">{ category.url }</a>
                            <div>{ category.description.slice(0, 40) + '...' }</div>
                            <div onClick={() => this.handleOpenModal(category)}>see more</div>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                    ))
                }
                <Modal show={show}
                       onClose={this.handleCloseModal}
                       title="Contact us">
                    <CategoryDetails category={category} />
                </Modal>
            </>
        )
    }
}

export default Category;
