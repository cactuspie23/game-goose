import { Message } from '../models/message.js'

function index(req, res) {
  Message.find({})
  .populate('author')
  .sort({createdAt: 'asc'})
  .then(messages => {
    res.render('messages/index', {
      title: 'Message Board',
      messages: messages.reverse()
    })
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  Message.create(req.body)
  .then(() => {
    res.redirect('/messages')
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate('author')
  .populate({
    path: 'replies',
    populate: {
      path: 'author'
    }
  })
  .then(message => {
    res.render('messages/show'), {
      title: 'Message Details',
      message
    }
  })
}

export {
  index,
  create,
  show
}