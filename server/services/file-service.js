const fs = require('fs')
const File = require('../models/file.model')

class FileService {
    async createFolder(file) {
        const filePath = `${process.env.filePath}/${file.user}/${file.path}`
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({message: 'Folder was created'})
                } else {
                    return reject({message: 'Folder already exist'})
                }
            } catch (error) {
                console.log(error)
                return reject({message: 'Creating user folder fail'})
            }
        })
    }

    async createUserDir(userId) {
        return new Promise((resolve, reject) => {
            const filePath = `${process.env.filePath}/${userId}`
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({message: 'Folder was created'})
                } else {
                    return reject({message: 'Folder already exist'})
                }
            } catch (error) {
                console.log(error)
                return reject({message: 'Creating user folder fail'})
            }
        })
    }
}

module.exports = new FileService()