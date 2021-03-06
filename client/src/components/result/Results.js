import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {searchArticles} from '../../actions/newsAction';
import {setShowSwitch} from '../../actions/navbarAction';
import {setBookmarkTab} from '../../actions/bookmarkAction';
import Row from 'react-bootstrap/Row';
import ResultItem from './ResultItem';

const Results = (props) => {
    useEffect(() => {
        props.setShowSwitch(false);
        props.setBookmarkTab(false);
    }, []);
    let query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        props.searchArticles(query.get('q'));
    }, [query.get('q')]);
    return (
        <Container fluid>
            <h2>Results</h2>
            {
                props.news.loading ?
                    <Spinner/> :
                    <Row>
                        {props.news.articles.map((article) => {
                            return <ResultItem article={article}/>;
                        })}
                    </Row>
            }
        </Container>
    )
};

Results.propTypes = {
    news: PropTypes.object.isRequired,
    searchArticles: PropTypes.func.isRequired,
    setShowSwitch: PropTypes.func.isRequired,
    setBookmarkTab: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, {
    searchArticles,
    setShowSwitch,
    setBookmarkTab
})(Results);