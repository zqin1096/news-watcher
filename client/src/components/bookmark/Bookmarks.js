import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux';
import {setBookmarkTab} from '../../actions/bookmarkAction';
import {setShowSwitch} from '../../actions/navbarAction';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import BookmarkItem from './BookmarkItem';

const Bookmarks = (props) => {
    useEffect(() => {
        props.setShowSwitch(false);
        props.setBookmarkTab(true);
    }, []);
    return (
        <Container fluid>
            {props.bookmark.favorites.length === 0 ?
                <h3 className="text-center py-3">You have no saved
                    articles</h3> :
                <React.Fragment>
                    <h2>Favorites</h2>
                    <Row>
                        {props.bookmark.favorites.map((favorite) => {
                            return <BookmarkItem favorite={favorite}/>
                        })}
                    </Row>
                </React.Fragment>
            }
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