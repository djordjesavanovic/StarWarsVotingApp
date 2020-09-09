import axios from "axios";

const StarWarsService = {

    getCharacters: (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `https://swapi.dev/api/people/${id}/`,
            }).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            });
        });
    },

    getImages: (q) => {
        /*
        I had to use https://cors-anywhere.herokuapp.com, since seprapi kept giving me the CORS policy error and I can't really do anything about it, since it's on the server side.
        'q' in this case is the search term, i.e. character's name
        */
        let params = {
            api_key: "7709a330315816dcca53bebaed84d80e1086e94b37382354ece88f6958819cbb",
            engine: "google",
            ijn: 0,
            q: q,
            google_domain: "google.com",
            tbm: "isch"
        }

        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://serpapi.com/search?api_key=${params.api_key}&engine=${params.engine}&ijn=${params.ijn}&q=${params.q}&google_domain=${params.google_domain}&tbm=${params.tbm}`,
            }).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            });
        });
    },
};

export default StarWarsService;
