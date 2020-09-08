import React, {Component} from "react";
import {Col} from "reactstrap";

const Loader = (props) => {

    const {text} = props

    return (
        <Col lg={12} className={'text-center align-center align-self-center pt-5 pb-5'}>
            <h3>{text}</h3>
        </Col>
    )
}
export default Loader
