
const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/auth-middleware')
const fileController = require('../controllers/file-controller')

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)
router.delete('', authMiddleware, fileController.deleteFile)

module.exports = router
