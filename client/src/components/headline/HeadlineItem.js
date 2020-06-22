import React from 'react';
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

const HeadlineItem = (props) => {
    const image = (props.article.image) ? props.article.image :
        (props.isChecked) ? GuardianDefault : NytimesDefault;
    const section = props.article.section === 'sport' ? 'sports' : props.article.section;
    const style = section === 'world' || section === 'politics' || section === 'business' ||
    section === 'technology' || section === 'sports' ? section : 'other';

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Row>
                <Col xs={12} lg={3}>
                    <Card.Img src={image}/>
                </Col>
                <Col xs={12} lg={9}>
                    <Card.Body>
                        <Card.Title>{props.article.title}</Card.Title>
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

    )
};

HeadlineItem.propTypes = {
    article: PropTypes.object.isRequired
}

export default HeadlineItem;