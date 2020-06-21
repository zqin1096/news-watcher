import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import GuardianDefault from '../layout/guardian_default.png';
import Shiitake from 'shiitake';
import Moment from 'react-moment';
import classes from './HeadlineItem.module.css'

const HeadlineItem = (props) => {
    const article = props.article;
    // Check if all the keys exist and are not null or undefined.
    const assets = article.hasOwnProperty('blocks') && article.blocks &&
    article.blocks.hasOwnProperty('main') && article.blocks.main &&
    article.blocks.main.hasOwnProperty('elements') && article.blocks.main.elements &&
    article.blocks.main.elements[0].hasOwnProperty('assets') && article.blocks.main.elements[0].assets ?
        article.blocks.main.elements[0].assets : null;
    const asset = assets ? assets[assets.length - 1] : null;
    const image = asset ? asset.file : GuardianDefault;

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Row>
                <Col xs={12} lg={3}>
                    <Card.Img src={image}/>
                </Col>
                <Col xs={12} lg={9}>
                    <Card.Body>
                        <Card.Title>{article.webTitle}</Card.Title>
                        <Card.Text>
                            <Shiitake lines={3}>
                                {article.blocks.body[0].bodyTextSummary}
                            </Shiitake>
                        </Card.Text>
                        <Moment
                            format="YYYY-MM-DD">{article.webPublicationDate}</Moment>
                        <h5 className="float-right"><Badge
                            className={classes[`${article.sectionId}`]}>{article.sectionId.toUpperCase()}</Badge>
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