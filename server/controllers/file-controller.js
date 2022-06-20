const User = require('../models/user.model')
const File = require('../models/file.model')
const UserService = require('../services/user-service')
const FileService = require('../services/file-service')
const ApiError = require('../exceptions/api-error')

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if(!parent) {
                file.path = name
                await FileService.createFolder(file)
            } else {
                file.path = `${parentFile.path}/${file.name}`
                await FileService.createFolder(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
    
            await file.save()
            return res.json(file)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }        
    }

    async getFiles(req, res) {

    }
}

module.exports = new FileController()