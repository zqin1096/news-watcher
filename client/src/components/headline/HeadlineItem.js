import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import GuardianDefault from '../layout/guardian_default.png';
import NytimesDefault from '../layout/nytimes_default.jpg';
import Shiitake from 'shiitake';
import Moment from 'react-moment';
import classes from './HeadlineItem.module.css';
import {MdShare} from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    EmailShareButton, EmailIcon
} from 'react-share';

const HeadlineItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const image = (props.article.image) ? props.article.image :
        (props.isChecked) ? GuardianDefault : NytimesDefault;
    const section = props.article.section === 'sport' ? 'sports' : props.article.section;
    const style = section === 'world' || section === 'politics' || section === 'business' ||
    section === 'technology' || section === 'sports' ? section : 'other';

    return (
        <React.Fragment>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                <Row>
                    <Col xs={12} lg={3}>
                        <Card.Img src={image}/>
                    </Col>
                    <Col xs={12} lg={9}>
                        <Card.Body>
                            <Card.Title>{props.article.title}<MdShare
                                onClick={handleShow}/></Card.Title>
                            <Card.Text>
                                <Shiitake lines={3}>
                                    {props.article.description}
                                </Shiitake>
                            </Card.Text>
                            <Moment
                                format="YYYY-MM-DD">{props.article.date}</Moment>
                            <h5 className="float-right"><Badge
                                className={classes[`${style}`]}>{section.toUpperCase()}</Badge>
                            </h5>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h5 className="text-center">{props.article.title}</h5>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center">Share via</h5>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <FacebookShareButton url={props.article.share}
                                                 hashtag="#CSCI_571_NewsApp">
                                <FacebookIcon round={true}/>
                            </FacebookShareButton>
                        </Col>

                        <Col className="d-flex justify-content-center">
                            <TwitterShareButton url={props.article.share}
                                                hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon round={true}/>
                            </TwitterShareButton>
                        </Col>

                        <Col className="d-flex justify-content-center">
                            <EmailShareButton url={props.article.share}
                                              subject="#CSCI_571_NewsApp">
                                <EmailIcon round={true}/>
                            </EmailShareButton>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
};

HeadlineItem.propTypes = {
    article: PropTypes.object.isRequired
}

export default HeadlineItem;