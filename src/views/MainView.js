import React, {Component} from "react";
import {Container, Row, Col, Jumbotron} from 'reactstrap'
import * as firebase from "firebase";
import StarWarsService from "../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader/Loader";

class MainView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
        }
        this.getCharacters = this.getCharacters.bind(this)
        this.handleVote = this.handleVote.bind(this)
    }

    getData() {
        const ref = firebase.database().ref('/people')

        ref.once("value", snapshot => {
            const state = snapshot.val();
            const people = state.filter(Boolean);
            this.setState({people: people});
        })
            .then(() => {
                this.state.people.map((item) => {this.getCharacters(item.id)})
            })

        ref.on("child_changed", snapshot => {
            const child = snapshot.val();

            let characterIndex = this.state.people.findIndex((character) => character.id === child.id)
            let newArray = [...this.state.people]
            newArray[characterIndex] = child

            this.setState({
                people: newArray
            })
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

        const ref = firebase.database().ref('/people')

        if (type === 'yay') {
            ref.update({[elementsIndex]: {...newArray[elementsIndex], yay: newArray[elementsIndex].yay + 1}})
        }
        if (type === 'nay') {
            ref.update({[elementsIndex]: {...newArray[elementsIndex], nay: newArray[elementsIndex].nay + 1}})
        }

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
                            (this.state.loaded && this.state.people[8].hasOwnProperty('person')) ?
                            this.state.people.map((person, i) => {
                                return (
                                    <Col lg={4} key={i}>
                                        <CharacterCard person={person} handleVote={this.handleVote} />
                                    </Col>
                                )
                            }) : <Loader text={'May the force be with you...'} />
                        }
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default MainView
