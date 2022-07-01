import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './disk.style.scss'
import DiskControls from './DiskControls/DiskControls'
import FileList from './FileList/FileList'
import FileService from '../../services/FileService'
import PopUp from './PopUp/PopUp'
import { useState } from 'react'
import Uploader from './Uploader/Uploader'


const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const [sort, setSort] = useState()
  const [drag, setDrag] = useState(false)

  useEffect(() => {
    dispatch(FileService.getFiles(currentDir, sort))
  }, [currentDir, sort])

  const onDropHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = [...e.dataTransfer.files]
    files.forEach(file => dispatch(FileService.uploadFile(file, currentDir)))
    setDrag(false)
  }

  const dragEnterHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
    return false;
  }


  return (
    !drag ?
      <div onDragEnter={dragEnterHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler}>
        <DiskControls />
        <FileList />
        <PopUp />
        <Uploader />
      </div>
      :
      <div onDragEnter={dragEnterHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={onDropHandler} className="drop-area">
        Drag here your files
      </div>
  )
}

export default Disk