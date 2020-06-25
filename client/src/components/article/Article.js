import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import {useLocation} from 'react-router-dom';
import {getArticle} from '../../actions/newsAction';
import Spinner from '../layout/Spinner';
import Container from 'react-bootstrap/Container';
import classes from './Article.module.css';
import Moment from 'react-moment';
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    EmailShareButton, EmailIcon
} from 'react-share';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Shiitake from 'shiitake';
import {MdExpandLess} from 'react-icons/md';
import {MdExpandMore} from 'react-icons/md';
import {IconContext} from 'react-icons';
import GuardianDefault from '../layout/guardian_default.png';
import NytimesDefault from '../layout/nytimes_default.jpg';

const Article = (props) => {
    const [showArrow, setShowArrow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [lines, setLines] = useState(4);
    const [truncated, setTruncated] = useState(false);

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    useEffect(() => {
        const handleResize = () => {
            setShowArrow(truncated);
            setLines(4);
            setExpanded(false);
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize)

        };
    });

    let query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        props.getArticle(query.get('id'), props.news.isChecked);
    }, [query.get('id')]);

    const onClick = () => {
        setExpanded(!expanded);
        if (lines === 4) {
            setLines(100);
        } else {
            setLines(4);
        }
    };
    return (
        props.news.loading ?
            <Spinner/> :
            props.news.article ?
                (
                    <Container fluid className={classes.article}>
                        <Card className="shadow-sm bg-white rounded">
                            <Card.Body>
                                <Row className="px-2">
                                    <h3 className="font-weight-bold font-italic">
                                        {props.news.article.title}
                                    </h3>
                                </Row>
                                <Row className="d-flex align-items-center px-4">
                                    <Moment
                                        className="font-weight-normal font-italic"
                                        format="YYYY-MM-DD">
                                        {props.news.article.date}
                                    </Moment>
                                    <div className="ml-auto">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Facebook
                                                </Tooltip>
                                            }>
                                            <FacebookShareButton
                                                url={props.news.article.share}
                                                hashtag="#CSCI_571_NewsApp">
                                                <FacebookIcon round={true}
                                                              size="25px"/>
                                            </FacebookShareButton>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Twitter
                                                </Tooltip>
                                            }>
                                            <TwitterShareButton
                                                url={props.news.article.share}
                                                hashtags={["CSCI_571_NewsApp"]}>
                                                <TwitterIcon round={true}
                                                             size="25px"/>
                                            </TwitterShareButton>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Email
                                                </Tooltip>
                                            }>
                                            <EmailShareButton
                                                url={props.news.article.share}
                                                subject="#CSCI_571_NewsApp">
                                                <EmailIcon round={true}
                                                           size="25px"/>
                                            </EmailShareButton>
                                        </OverlayTrigger>
                                    </div>
                                </Row>
                                <Row className="py-2 px-2">
                                    <Card.Img src={props.news.article.image ?
                                        props.news.article.image : props.news.isChecked ?
                                            GuardianDefault : NytimesDefault}/>
                                </Row>
                                <Row className="px-2">
                                    {
                                        <Card.Text>
                                            <Shiitake lines={lines}
                                                      onTruncationChange={(isTruncated) => {
                                                          setTruncated(isTruncated);
                                                          setShowArrow(isTruncated || expanded);
                                                      }}>
                                                {props.news.article.description}
                                            </Shiitake>
                                        </Card.Text>
                                    }
                                </Row>
                                <Row className="px-3">
                                    {!showArrow ? null : !expanded ?
                                        <IconContext.Provider
                                            value={{size: '2em'}}>
                                            <MdExpandMore className="ml-auto"
                                                          onClick={onClick}/>
                                        </IconContext.Provider> :
                                        <IconContext.Provider
                                            value={{size: '2em'}}>
                                            <MdExpandLess className="ml-auto"
                                                          onClick={onClick}/>
                                        </IconContext.Provider>
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                ) : <Container fluid>
                    <h1>The page cannot be found</h1>
                </Container>
    )
};

Article.propTypes = {
    news: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
};

export default connect(mapStateToProps, {getArticle})(Article);