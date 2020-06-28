import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import classes from './ResultItem.module.css';
import {MdShare} from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    EmailShareButton, EmailIcon
} from 'react-share';
import Moment from 'react-moment';
import GuardianDefault from '../layout/guardian_default.png';
import NytimesDefault from '../layout/nytimes_default.jpg';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';

const ResultItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        event.preventDefault();
        setShow(true);
    };

    const image = (props.article.image) ? props.article.image :
        (props.article.source === 'guardian') ? GuardianDefault : NytimesDefault;
    const section = props.article.section === 'sport' ? 'sports' : props.article.section;
    const style = section === 'world' || section === 'politics' || section === 'business' ||
    section === 'technology' || section === 'sports' ? section : 'other';
    return (
        <Col xs={12} lg={3} className="p-2">
            <React.Fragment>
                <Card className="shadow">
                    <NavLink exact
                             to={{
                                 pathname: `/${section}/article`,
                                 search: `?id=${props.article.article}`,
                                 state: {source: props.article.source}
                             }}
                             className={classes.link}>
                        <Card.Body>
                            <Card.Title
                                className="font-italic">{props.article.title}
                                <MdShare onClick={handleShow}/>
                            </Card.Title>
                            <Container fluid
                                       className="border rounded mt-1 mb-3 px-1 py-1">
                                <Card.Img src={image}/>
                            </Container>

                            <Moment className="font-italic"
                                    format="YYYY-MM-DD">{props.article.date}</Moment>
                            <h5 className="float-right"><Badge
                                className={classes[`${style}`]}>{section.toUpperCase()}</Badge>
                            </h5>
                        </Card.Body>
                    </NavLink>
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
        </Col>
    )
};

export default ResultItem;