import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux';
import {setBookmarkTab} from '../../actions/bookmarkAction';
import {setShowSwitch} from '../../actions/navbarAction';
import PropTypes from 'prop-types';

const Bookmarks = (props) => {
    useEffect(() => {
        props.setShowSwitch(false);
        props.setBookmarkTab(true);
    }, []);
    return (
        <Container fluid>
            <h2>Favorites</h2>

        </Container>
    )
};

Bookmarks.propTypes = {
    bookmark: PropTypes.object.isRequired,
    setBookmarkTab: PropTypes.func.isRequired,
    setShowSwitch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        bookmark: state.bookmark
    };
};

export default connect(mapStateToProps, {
    setBookmarkTab,
    setShowSwitch
})(Bookmarks);