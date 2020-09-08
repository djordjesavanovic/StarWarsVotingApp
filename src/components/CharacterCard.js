import React, {Component} from 'react'
import {Row, Col, Card, CardImg, CardBody, CardFooter, Button} from "reactstrap";

class CharacterCard extends Component {
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this)
    }

    handleVote(type, id) {
        this.props.handleVote(type, id)
    }

    render() {
        return (
            <Card className={'mb-3'}>
                <CardImg top width="100%" height={200} src={!this.props.person.imageURL ? null : this.props.person.imageURL}
                         alt={this.props.person.person.name}/>
                <CardBody>
                    <p>
                        Birth year: {this.props.person.person.birth_year}
                    </p>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col>
                            <Button color={'success'} block
                                    onClick={() => this.handleVote('yay', this.props.person.id)}
                            >
                                Yay {this.props.person.yay}
                            </Button>
                        </Col>
                        <Col>
                            <Button color={'danger'} block
                                    onClick={() => this.handleVote('nay', this.props.person.id)}
                            >
                                Nay {this.props.person.nay}
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        )
    }
}

export default CharacterCard
