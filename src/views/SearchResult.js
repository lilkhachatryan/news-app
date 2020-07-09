import React, { Component } from "react";
import { getEverything } from "../utils/endpoints";
import qs from 'qs'

class SearchResult extends Component {
    state = {
        articles: [],
        params: {
            q: null
        }
    };

    componentDidMount() {
        this.getArticlesFromServer()
    }

    getArticlesFromServer = () => {
        const { location } = this.props;
        getEverything({ q: qs.parse(location.search, { ignoreQueryPrefix: true }) })
            .then(res => {
                this.setState({ articles: res.data.articles })
            })
    };

    render() {
        const { articles } = this.state;

        return (
            <>
                <br />
                <div>Search results</div>
                <hr />
                <br />
                {
                    articles.map((article, index) => (
                        <div key={index + 'article'}>
                            <div>{ article.author }</div>
                            <div>{ article.publishedAt }</div>
                            <a href={article.url} target="_blank">{ article.url }</a>
                            <div>{ article.description.slice(0, 40) + '...' }</div>
                            <hr />
                            <hr />
                        </div>
                    ))
                }
            </>
        )
    }
}

export default SearchResult;
