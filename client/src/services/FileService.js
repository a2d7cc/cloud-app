import $api from '../http/index'
import { hideLoader, showLoader } from '../reducers/appReducer'
import { addFile, deleteFileAction, setFiles } from '../reducers/fileReducer'
import { showUploader,addUploadFile, changeUploadFile} from '../reducers/uploadReducer'

export default class FileService {
    static getFiles(currentDir, sort) {
        return async dispatch => {
            try {
                const files = await $api.get('files', {
                    params: {
                        parent: currentDir,
                        sort: sort
                    }
                })
                dispatch(setFiles(files.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    static createFolder(nameDir, parent) {
        return async dispatch => {
            try {
                const response = await $api.post('files', {
                    name: nameDir,
                    type: 'dir',
                    parent: parent
                })
                dispatch(addFile(response.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    static uploadFile(file, dirId) {
        return async dispatch => {
            try {
                const formData = new FormData()
                formData.append('file', file)
                if(dirId) {
                    formData.append('parent', dirId)
                }
                const uploadFile = {name: file.name, progress: 0, id: Date.now()}
                dispatch(showUploader())
                dispatch(addUploadFile(uploadFile))
                const response = await $api.post('files/upload', formData, {
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploadFile(uploadFile))
                        }
                    }
                });
 
                dispatch(addFile(response.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    static downloadFile(file) {
        return async dispatch => {
            try {
                const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.status === 200) {
                    const blob = await response.blob()
                    const downloadUrl = window.URL.createObjectURL(blob)
                    const link =  document.createElement('a')
                    link.href = downloadUrl
                    link.download = file.name   
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    static deleteFile(file) {
        return async dispatch => {
            const response = await $api.delete('files', {
                params: {
                    id: file._id
                }
            })
            dispatch(deleteFileAction(file._id))
        }
    }
}