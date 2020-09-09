import React, {Component} from "react";
import {Container, Row, Col} from 'reactstrap'
import * as firebase from "firebase";
import StarWarsService from "../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterCard from "../components/CharacterCard/CharacterCard";
import Loader from "../components/Loader/Loader";
import logo from '../assets/img/logo.png'

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
        // Reference to the Realtime Database + its 'people' property
        const ref = firebase.database().ref('/people')

        // Initial fetch and mapping through IDs, for the sake of fetching characters from swapi
        ref.once("value", snapshot => {
            const state = snapshot.val();
            // This filter was implemented, because this fetch kept returning an empty value at 0 index for an unknown reason
            const people = state.filter(Boolean);
            this.setState({people: people});
        })
            .then(() => {
                this.state.people.map((item) => {this.getCharacters(item.id)})
            })

        // Listener for changes in children
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
        // Fetching a character from swapi
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
            // Fetching an image for the character
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
        // Fetching an image from serpapi
        StarWarsService.getImages(q)
            .then((res) => {
                const elementsIndex = this.state.people.findIndex((element) => element.person.name === q)
                let newArray = [...this.state.people]

                newArray[elementsIndex] = {
                    ...newArray[elementsIndex],
                    imageURL: res.data.images_results[Math.floor(Math.random() * 10)].original // Taking character image form a random array index
                }

                this.setState({people: newArray, loaded: true})

            })
            .catch((err) => {
                // Left as console log on purpose, since this API throws too many (unnecessary) errors (it doesn't handle robots blocking access to some images)
                console.log(err)
            })
    }

    // Vote handler
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
            <Container fluid className={'bg-dark pt-3'}>
                <Container>
                    <Row className={'text-center mt-3 mb-5'}>
                        <Col>
                            <img src={logo} alt={'Star Wars Logo'} className={'starWarsLogo'}/>
                        </Col>
                    </Row>
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
