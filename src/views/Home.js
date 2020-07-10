import React, { Component } from "react";
import { getTops } from "../utils/endpoints";
import { formatDate } from "../utils/helpers";

class Home extends Component {
    state = {
        articles: [],
        params: {
            country: 'us',
            page: 1,
            pageSize: 10
        },
        _error: false,
        _loading: false
    };

    componentDidMount() {
        this.getTopsFromServer()
    }

    getTopsFromServer = () => {
        this.setState({ _loading: true });
        getTops(this.state.params)
            .then(res => {
                this.setState({ articles: res.data.articles, _loading: false })
            })
            .catch((e) => {
                this.setState({ _error: true, _loading: false })
            })
    };

    render() {
        const { articles, _error, _loading } = this.state;

        if (_loading) return (<div>Loading...</div>);

        if (_error) return (<div>Something went wrong</div>);

        return (
            <>
                <div>Top headlines</div>
                <hr />
                <br />
                {
                    articles.map((article, index) => (
                        <div key={index + 'home'}
                             className="card mb-3 py-5 px-4">
                            <div>{ article.author }</div>
                            <div className="mb-3">{ formatDate(article.publishedAt) }</div>
                            <div>{ article.title }</div>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">{ article.url }</a>
                        </div>
                    ))
                }
            </>
        )
    }
}

export default Home;
