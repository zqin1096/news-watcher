import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import {useLocation} from 'react-router-dom';
import {getArticle} from '../../actions/newsAction';
import {setShowSwitch} from '../../actions/navbarAction';
import {setBookmarkTab} from '../../actions/bookmarkAction';
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
import * as Scroll from 'react-scroll';
import Comment from './Comment';
import {BsBookmark, BsBookmarkFill} from 'react-icons/bs';
import {addBookmark, removeBookmark} from '../../actions/bookmarkAction';
import {toast, cssTransition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Article = (props) => {
    // Arrow for expanding the description of the article.
    const [showArrow, setShowArrow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [lines, setLines] = useState(20);
    const [truncated, setTruncated] = useState(false);

    const [, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    useEffect(() => {
        props.setShowSwitch(false);
        props.setBookmarkTab(false);
    }, []);
    // Reset states on window resize.
    useEffect(() => {
        const handleResize = () => {
            setShowArrow(truncated);
            setLines(20);
            setExpanded(false);
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        };
    });

    let query = new URLSearchParams(useLocation().search);
    // When a ResultItem/HeadlineItem is clicked, its source is passed in and
    // persisted to the location.
    const isChecked = props.location.state.source === 'guardian';
    useEffect(() => {
        props.getArticle(query.get('id'), isChecked);
    }, [query.get('id')]);

    const onClick = () => {
        setExpanded(!expanded);
        if (lines === 20) {
            setLines(200);
        } else {
            // Scroll to the top.
            Scroll.animateScroll.scrollToTop({
                duration: 1000
            });
            setTimeout(() => {
                setLines(20);
            }, 1000);
        }
    };

    const Zoom = cssTransition({
        enter: classes.zoomIn,
        exit: classes.zoomOut,
        duration: 500
    });
    const addBookmarkToast = () => {
        toast(`Saving ${props.news.article.title}`, {
            transition: Zoom
        });
        props.addBookmark(props.news.article);
    }
    const removeBookmarkToast = () => {
        toast(`Removing ${props.news.article.title}`, {
            transition: Zoom
        });
        props.removeBookmark(props.news.article);
    }

    const isBookmarked = props.bookmark.favorites.find((favorite) => {
        return favorite.share === props.news.article.share
    });
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
                                    <div className={classes.bookmark}>
                                        <IconContext.Provider
                                            value={{
                                                color: 'red',
                                                size: '1.5em'
                                            }}>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        Bookmark
                                                    </Tooltip>
                                                }>
                                                {isBookmarked ?
                                                    <BsBookmarkFill
                                                        onClick={removeBookmarkToast}/> :
                                                    <BsBookmark
                                                        onClick={addBookmarkToast}/>
                                                }
                                            </OverlayTrigger>
                                        </IconContext.Provider>
                                    </div>
                                </Row>
                                <Row className="py-2 px-2">
                                    <Card.Img src={props.news.article.image ?
                                        props.news.article.image : isChecked ?
                                            GuardianDefault : NytimesDefault}/>
                                </Row>
                                <Row className="px-2">
                                    <Scroll.Element name="descTop"/>
                                    <Card.Text>
                                        <Shiitake lines={lines}
                                                  onTruncationChange={(isTruncated) => {
                                                      setTruncated(isTruncated);
                                                      setShowArrow(isTruncated || expanded);
                                                  }}>
                                            {props.news.article.description}
                                        </Shiitake>
                                    </Card.Text>
                                    <Scroll.Element name="descBot"/>
                                </Row>
                                <Row className="px-3">
                                    {!showArrow ? null : !expanded ?
                                        <IconContext.Provider
                                            value={{size: '2em'}}>
                                            <Scroll.Link to="descBot" spy={true}
                                                         smooth={true}
                                                         offset={50}
                                                         duration={1000}
                                                         className="ml-auto">
                                                <MdExpandMore
                                                    onClick={onClick}/>
                                            </Scroll.Link>
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
                        <Comment id={query.get('id')}/>
                    </Container>
                ) : <Container fluid>
                    <h1>The page cannot be found</h1>
                </Container>
    )
};

Article.propTypes = {
    news: PropTypes.object.isRequired,
    bookmark: PropTypes.object.isRequired,
    getArticle: PropTypes.func.isRequired,
    setShowSwitch: PropTypes.func.isRequired,
    setBookmarkTab: PropTypes.func.isRequired,
    addBookmark: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        news: state.news,
        bookmark: state.bookmark
    }
};

export default connect(mapStateToProps, {
    getArticle,
    setShowSwitch,
    setBookmarkTab,
    addBookmark,
    removeBookmark
})(Article);