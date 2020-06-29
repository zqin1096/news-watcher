import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getArticles} from '../../actions/newsAction';
import {setShowSwitch} from '../../actions/navbarAction';
import Spinner from '../layout/Spinner';
import Container from 'react-bootstrap/Container';
import HeadlineItem from './HeadlineItem';
import classes from './Headlines.module.css';

const Headlines = (props) => {
    useEffect(() => {
        props.setShowSwitch(true);
    }, []);
    const {section} = props.match.params;
    useEffect(() => {
        props.getArticles(section, props.news.isChecked);
    }, [section, props.news.isChecked]);
    if (section !== undefined &&
        section !== 'world' &&
        section !== 'politics' &&
        section !== 'business' &&
        section !== 'technology' &&
        section !== 'sports') {
        return (
            <Container fluid>
                <h1>The page cannot be found</h1>
            </Container>
        );
    }
    return (
        // Display a spinner if the data is being fetched.
        (props.news.loading) ?
            <Spinner/>
            :
            <Container fluid className={classes.headlines}>
                {props.news.articles.map((article) => {
                    return <HeadlineItem
                        key={article.id}
                        article={article}
                        isChecked={props.news.isChecked}/>
                })}
            </Container>
    )
};

Headlines.propTypes = {
    news: PropTypes.object.isRequired,
    getArticles: PropTypes.func.isRequired,
    setShowSwitch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, {
    getArticles,
    setShowSwitch
})(Headlines);