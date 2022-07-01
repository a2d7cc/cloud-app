const { use } = require('bcrypt/promises')
const fs = require('fs')
const File = require('../models/file.model')
const User = require('../models/user.model')

class FileService {
    async createFolder(file) {
        const filePath = `${process.env.filePath}/${file.user}/${file.path}`
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({ message: 'Folder was created' })
                } else {
                    return reject({ message: 'Folder already exist' })
                }
            } catch (error) {
                console.log(error)
                return reject({ message: 'Creating user folder fail' })
            }
        })
    }

    async createUserDir(userId) {
        return new Promise((resolve, reject) => {
            const filePath = `${process.env.filePath}/${userId}`
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({ message: 'Folder was created' })
                } else {
                    return reject({ message: 'Folder already exist' })
                }
            } catch (error) {
                console.log(error)
                return reject({ message: 'Creating user folder fail' })
            }
        })
    }

    async uploadFile(uploadedFile, user, parentFile) {

        if (user.usedSpace + uploadedFile.size > user.diskSpace) {
            return res.status(400).json({ message: 'There no space on the disk' })
        }
        user.usedSpace = user.usedSpace + uploadedFile.size

        await user.save()

        const type = uploadedFile.name.split('.').pop()
        const name = uploadedFile.name
        const size = uploadedFile.size

        const dbFile = new File({
            name, type, size, user: user._id
        })


        if (!parentFile) {
            const path = uploadedFile.name
            const movePath = `${process.env.filePath}/${user._id}/${path}`
            if (fs.existsSync(movePath)) {
                throw new Error('File with this name already exist')
            }
            uploadedFile.mv(movePath)
            dbFile.path = path
        } else {
            const path = parentFile.path + '/' + uploadedFile.name
            const movePath = `${process.env.filePath}/${user._id}/${path}`
            if (fs.existsSync(movePath)) {
                throw new Error('File with this name already exist')
            }
            dbFile.path = path
            dbFile.parent = parentFile._id
            uploadedFile.mv(movePath)
            parentFile.childs.push(dbFile._id)
            parentFile.save()
        }


        await dbFile.save()

        return dbFile
    }

    getPath(file) {
        return `${process.env.filePath}/${file.user}/${file.path}`
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if (fs.existsSync(path)) {
            if (file.type === 'dir') {
                fs.rmdirSync(path, { recursive: true, force: true })
            } else {
                fs.unlinkSync(path)
            }
        }
    }

}

module.exports = new FileService()