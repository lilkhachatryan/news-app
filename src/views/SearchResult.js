import React, { Component } from "react";
import { getEverything } from "../utils/endpoints";
import { formatDate } from "../utils/helpers";
import languages from "../languages";
import qs from 'qs'

class SearchResult extends Component {
    state = {
        articles: [],
        params: {
            q: null,
            page: 1,
            pageSize: 10,
            language: null
        },
        _error: false,
        _loading: false
    };

    componentDidMount() {
        const { location } = this.props;
        let search = qs.parse(location.search, { ignoreQueryPrefix: true });
        this.setState({ params: { ...this.state.params, q: search.q } }, this.getArticlesFromServer);
    }

    getArticlesFromServer = () => {
        if (!this.state.params.q) {
            this.setState({ articles: [] });
            return
        }
        this.setState({ _loading: true });
        getEverything(this.state.params)
            .then(res => {
                this.setState({ articles: res.data.articles, _loading: false });
            })
            .catch((e) => {
                this.setState({ _error: true, _loading: false })
            })
    };

    onSelectLanguage = (e) => {
        const language = e.target.value ? e.target.value : null;
        this.setState({ params: { ...this.state.params, language } }, this.getArticlesFromServer);
    };

    formatDescription = (description) => {
        return description && description.slice(0, 140) + (description.length > 140 ? '...' : '')
    };

    render() {
        const { articles, params, _error, _loading } = this.state;

        if (_loading) return (<div>Loading...</div>);

        if (_error) return (<div>Something went wrong</div>);

        return (
            <>
                <div>Search results</div>
                <hr />
                <br />
                <div className="d-flex">
                    <div>Filter by language</div>
                    <select onChange={this.onSelectLanguage}
                            value={params.language || ''}
                            className="form-control mb-3">
                        <option value="">Default select</option>
                        {
                            languages.map((language, i) => (
                                <option value={language.code}
                                        key={language.code + i}>{language.name}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    articles.map((article, index) => (
                        <div key={index + 'article'}
                             className="card mb-3 py-5 px-4">
                            <div>{ article.author }</div>
                            <div className="mb-3">{ formatDate(article.publishedAt) }</div>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">{ article.url }</a>
                            <div>{ this.formatDescription(article.description) }</div>
                        </div>
                    ))
                }
            </>
        )
    }
}

export default SearchResult;
