import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'

const router = Router()

router.get('/', isLoggedIn, messagesCtrl.index)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}

export {
  router
}