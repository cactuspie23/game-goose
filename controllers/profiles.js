import { Profile } from "../models/profile.js"
import { Game } from "../models/game.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: "Game Goose Profiles",
      profiles,
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('friends')
  .then((profile) => {
    Game.find({ collectedBy: profile._id })
    .then(games => {
      Profile.findById(req.user.profile)
      .then(userProfile => {
        res.render('profiles/show', {
          title: `${profile.name}'s profile`,
          profile,
          userProfile,
          games
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/edit', {
      title: `Editing ${profile.name}'s profile`,
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body)
  .then(profile => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  show,
  edit,
  update,
  addFriend,
  removeFriend
}
