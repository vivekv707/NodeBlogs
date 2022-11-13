const blogController = require('../controllers/blogController')
const express = require('express')
const router  = express.Router()
//blog routes
router.get('/',blogController.blog_index)
router.get('/create',blogController.blog_create_get)
router.get('/:id',blogController.blog_details)
//post request
router.post('/',blogController.blog_create_post)
//delete request
router.delete('/:id',blogController.blog_delete)

module.exports = router