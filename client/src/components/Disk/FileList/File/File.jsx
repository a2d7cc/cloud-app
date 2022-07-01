import React from 'react'
import './file.scss'
import DirectoryIcon from '../../../../assets/directory.svg'
import FileIcon from '../../../../assets/file.svg'
import Button from '../../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import FileService from '../../../../services/FileService'
import sizeFormat from '../../../../utils/helpers/sizeFormat'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  const fileName = (name) => {
    if(file.type === 'dir') return name;
    
    let parts = name.split('.')
    let filename = parts[0]
    let extension = parts[parts.length-1]

    if(filename.length > 12) {
      filename = filename.substring(0, 12)
    }

    return filename  + '....' + extension;
  }

  const openDirHandler = () => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }
  const downloadFileHandler = (e) => {
    e.stopPropagation()
    dispatch(FileService.downloadFile(file))
   }
  const deleteFileHandler = (e) => {
    e.stopPropagation()
    dispatch(FileService.deleteFile(file))
   }

  return (
    <div className="file" onClick={openDirHandler}>
      <img src={file.type === 'dir' ? DirectoryIcon : FileIcon} className="file__img" alt="Icon" />
      <div className="file__name">{fileName(file.name)}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== "dir" && <Button className="file__btn file__download" onClick={downloadFileHandler}>Dowload</Button>}
      <Button className="file__btn file__delete" onClick={deleteFileHandler}>Delete</Button>
    </div>
  )
}

export default File