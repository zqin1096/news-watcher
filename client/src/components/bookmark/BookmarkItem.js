import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classes from './BookmarkItem.module.css';
import Moment from 'react-moment';
import GuardianDefault from '../layout/guardian_default.png';
import NytimesDefault from '../layout/nytimes_default.jpg';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {NavLink} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {MdShare} from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    EmailShareButton, EmailIcon
} from 'react-share';
import {MdDelete} from 'react-icons/md';
import {connect} from 'react-redux';
import {removeBookmark} from '../../actions/bookmarkAction';
import {toast, cssTransition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookmarkItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        event.preventDefault();
        setShow(true);
    };
    const Zoom = cssTransition({
        enter: classes.zoomIn,
        exit: classes.zoomOut,
        duration: 500
    });
    const removeBookmarkToast = () => {
        toast(`Removing ${props.favorite.title}`, {
            transition: Zoom
        });
    }

    const removeBookmark = (event) => {
        event.preventDefault();
        removeBookmarkToast();
        props.removeBookmark(props.favorite);
    };

    const image = (props.favorite.image) ? props.favorite.image :
        (props.favorite.source === 'guardian') ? GuardianDefault : NytimesDefault;
    const section = props.favorite.section === 'sport' ? 'sports' : props.favorite.section;
    const style = section === 'world' || section === 'politics' || section === 'business' ||
    section === 'technology' || section === 'sports' ? section : 'other';
    const source = props.favorite.source;
    return (
        <Col xs={12} lg={3} className="p-2">
            <React.Fragment>
                <Card className="shadow">
                    <NavLink exact
                             to={{
                                 pathname: `/${section}/article`,
                                 search: `?id=${props.favorite.article}`,
                                 state: {source: props.favorite.source}
                             }}
                             className={classes.link}>
                        <Card.Body>
                            <Card.Title
                                className="font-italic">{props.favorite.title}
                                <MdShare onClick={handleShow}/>
                                <MdDelete onClick={removeBookmark}/>
                            </Card.Title>
                            <Container fluid
                                       className="border rounded mt-1 mb-3 px-1 py-1">
                                <Card.Img src={image}/>
                            </Container>

                            <Moment className="font-italic"
                                    format="YYYY-MM-DD">{props.favorite.date}</Moment>
                            <h5 className="float-right mx-1">
                                <Badge
                                    className={classes[`${source}`]}>{source.toUpperCase()}
                                </Badge>
                            </h5>
                            <h5 className="float-right">
                                <Badge
                                    className={classes[`${style}`]}>{section.toUpperCase()}
                                </Badge>
                            </h5>
                        </Card.Body>
                    </NavLink>
                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h5 className="text-center">{props.favorite.title}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="text-center">Share via</h5>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <FacebookShareButton url={props.favorite.share}
                                                     hashtag="#CSCI_571_NewsApp">
                                    <FacebookIcon round={true}/>
                                </FacebookShareButton>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <TwitterShareButton url={props.favorite.share}
                                                    hashtags={["CSCI_571_NewsApp"]}>
                                    <TwitterIcon round={true}/>
                                </TwitterShareButton>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <EmailShareButton url={props.favorite.share}
                                                  subject="#CSCI_571_NewsApp">
                                    <EmailIcon round={true}/>
                                </EmailShareButton>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </Col>
    )
};

BookmarkItem.propTypes = {
    favorite: PropTypes.object.isRequired,
    removeBookmark: PropTypes.func.isRequired
}

export default connect(null, {removeBookmark})(BookmarkItem);