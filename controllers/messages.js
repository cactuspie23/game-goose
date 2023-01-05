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

export {
  index
}