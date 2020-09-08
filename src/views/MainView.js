import React, {Component} from "react";
import {Container, Row, Col, Jumbotron} from 'reactstrap'
import * as firebase from "firebase";
import StarWarsService from "../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterCard from "../components/CharacterCard";

class MainView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: []
        }

        this.handleVote = this.handleVote.bind(this)
    }

    getData() {
        const ref = firebase.database().ref('/people')

        ref.on("value", snapshot => {
            const state = snapshot.val();
            const people = state.filter(Boolean);
            this.setState({people: people}, () => this.state.people.map(item => this.getCharacters(item.id)));
        })
    }

    getCharacters(id) {
        StarWarsService.getCharacters(id)
            .then((res) => {
                let person = res.data
                let characterIndex = this.state.people.findIndex((character) => character.id === id)
                let newArray = [...this.state.people]

                newArray[characterIndex] = {...newArray[characterIndex], person}

                this.setState({
                    people: newArray
                })
            })
            .then(() => {
                this.state.people.map((item) => {
                    this.getImages(item.person.name)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getImages(q) {
        StarWarsService.getImages(q)
            .then((res) => {
                const elementsIndex = this.state.people.findIndex((element) => element.person.name === q)
                let newArray = [...this.state.people]

                newArray[elementsIndex] = {
                    ...newArray[elementsIndex],
                    imageURL: res.data.images_results[Math.floor(Math.random() * 10)].original
                }

                this.setState({people: newArray, loaded: true})

            })
            .catch((err) => {
                console.log(JSON.stringify(err))
            })
    }

    handleVote(type, id) {
        const elementsIndex = this.state.people.findIndex((element) => element.id === id)
        let newArray = [...this.state.people]

        if (type === 'yay') {
            newArray[elementsIndex] = {...newArray[elementsIndex], yay: newArray[elementsIndex].yay + 1}
        }
        if (type === 'nay') {
            newArray[elementsIndex] = {...newArray[elementsIndex], nay: newArray[elementsIndex].nay + 1}
        }

        delete newArray[elementsIndex].imageURL
        delete newArray[elementsIndex].person

        const ref = firebase.database().ref('/people')
        ref.update({[elementsIndex]: {...newArray[elementsIndex], yay: newArray[elementsIndex].yay + 1}})
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        return (
            <Container fluid className={'bg-light pt-3'}>
                <Container>
                    <Jumbotron className={'text-center mt-3'}>
                        <h2>Star Wars Voting App</h2>
                    </Jumbotron>
                    <Row>
                        {
                            (this.state.loaded && this.state.people[9].hasOwnProperty('person')) &&
                            this.state.people.map((person, i) => {
                                return (
                                    <Col lg={4} key={i}>
                                        <CharacterCard person={person} handleVote={this.handleVote} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default MainView
