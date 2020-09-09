import React, {Component} from 'react'
import {Row, Col, Card, CardImg, CardBody, CardFooter, Button} from "reactstrap";
import dislike from '../../assets/img/dislike.png'
import like from '../../assets/img/like.png'

class CharacterCard extends Component {
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this)
    }

    handleVote(type, id) {
        this.props.handleVote(type, id)
    }

    render() {
        const placeholder = 'https://via.placeholder.com/400x300'
        return (
            <Card className={'mb-4 bg-dark text-white'}>
                <CardImg top width="100%" height={200} src={!this.props.person.imageURL ? placeholder : this.props.person.imageURL}
                         alt={!this.props.person.person ? '' : this.props.person.person.name}/>
                <CardBody className={'pb-1'}>
                    <p>
                        <strong>Name:</strong> {!this.props.person.person ? '' : this.props.person.person.name} <br/>
                        <strong>Birth year:</strong> {!this.props.person.person ? '' : this.props.person.person.birth_year} <br/>
                        <strong>Gender:</strong> {!this.props.person.person ? '' : this.props.person.person.gender === 'n/a' ? 'Probably a robot...' : this.props.person.person.gender} <br/>
                        <strong>Height:</strong> {!this.props.person.person ? '' : this.props.person.person.height} cm<br/>
                        <strong>Hair color:</strong> {!this.props.person.person ? '' : this.props.person.person.hair_color}
                    </p>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col>
                            <Button color={'success'} block
                                    onClick={() => this.handleVote('yay', this.props.person.id)}
                            >
                                <img src={like} alt={'Yay'} className={'voteIcon'} />
                                {this.props.person.yay}
                            </Button>
                        </Col>
                        <Col>
                            <Button color={'danger'} block
                                    onClick={() => this.handleVote('nay', this.props.person.id)}
                            >
                                <img src={dislike} alt={'Nay'} className={'voteIcon'} />
                                {this.props.person.nay}
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        )
    }
}

export default CharacterCard
