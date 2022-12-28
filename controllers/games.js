import { Game } from '../models/game.js'
import axios from 'axios'

function search(req, res) {
  axios
  .get(`https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`)
  .then(response => {
    res.render('games/results', {
      title: 'Search Results',
      results: response.data.results,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`)
  .then(response => {
    Game.findOne({ rawgId: response.data.id })

    .then((game)=> {
      res.render('games/show', {
        title: 'Game Details',
        apiResult: response.data,
        game,
        userHasGame: game?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  search,
  show,
}