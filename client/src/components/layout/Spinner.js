import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import BounceLoader from 'react-spinners/BounceLoader'

const Spinner = () => {
    return (
        <div className="d-flex align-items-center min-vh-100">
            <Container fluid>
                <Row className="justify-content-center">
                    <BounceLoader color="#627DD8" size="35px"/>
                </Row>
                <Row className="justify-content-center">
                    <h4>Loading</h4>
                </Row>
            </Container>
        </div>
    );
};

export default Spinner;
