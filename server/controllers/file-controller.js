const User = require('../models/user.model')
const File = require('../models/file.model')
const UserService = require('../services/user-service')
const FileService = require('../services/file-service')
const ApiError = require('../exceptions/api-error')
const fs = require('fs')

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, parent, user: req.user.id })
            const parentFile = await File.findOne({ _id: parent })
            if (!parent) {
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

    async uploadFile(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (!user) {
                throw new Error('User not founded by uploading the file')
            }

            const parentFile = await File.findOne({ _id: req.body.parent })

            const uploadedFile = req.files.file
            if (!uploadedFile) {
                throw new Error('The file was not uploaded')
            }

            const fileData = await FileService.uploadFile(uploadedFile, user, parentFile)
            return res.json(fileData)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async downloadFile(req, res) {
        try {
            const userId = req.user.id
            const fileId = req.query.id
            const file = await File.findOne({_id: fileId, user: userId})
            if(!file) {
                throw new Error('The file not founded')
            }
            const path = FileService.getPath(file)
            if(!fs.existsSync(path)) {
                throw new Error('The file is not founded on a server')
            }

            return res.download(path, file.name)

        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if(!file) {
                throw new Error('The file is not founded by deleting')
            }
            FileService.deleteFile(file)
            await file.remove()
            return res.json('File was deleted')
            
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async searchFile(req, res) {
        try {
            const search = req.query.search
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(search))
            return res.json(files)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    async getFiles(req, res) {
        try {
            const {sort} = req.query
            let files
            switch(sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break
            }
            return res.json(files)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

}

module.exports = new FileController()