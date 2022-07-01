import React, { useState } from 'react'
import './controls.style.scss'
import Button from '../../UI/Button/Button'
import Select from '../../UI/Select/Select'
import Input from '../../UI/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDir, setPopUpDisplay, setView } from '../../../reducers/fileReducer'
import FileService from '../../../services/FileService'

const DiskControls = ({setSort, sort}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)

  const backClickHandler = () => {
    const backDir = dirStack.pop()
    dispatch(setCurrentDir(backDir))
  }

  const createFolderHandler = () => {
    dispatch(setPopUpDisplay('flex'))
  }

  const uploadFileHandler = (e) => {
    const files = [...e.target.files]
    files.forEach(file => dispatch(FileService.uploadFile(file, currentDir)))
  }

  return (
    <div className="diskcontrols">
      {currentDir && <Button className="diskcontrols__back" onClick={backClickHandler}>Back</Button>}
      <Button className="diskcontrols__create-folder" onClick={createFolderHandler}>Create a folder</Button>
      <div className="diskcontrols__upload">
        <label className="diskcontrols__upload-label" htmlFor="diskcontrols__upload-input" >Upload a file</label>
        <Input multiple={true} type="file" onChange={uploadFileHandler} className="diskcontrols__upload-input" id="diskcontrols__upload-input" />
      </div>
      <Select onChange={e => setSort(e.target.value)} value={sort} defaultValue={""} className="diskcontrols__select" options={[
        { value: "", name: "Choose sort", disabled: true},
        { value: "name", name: "name" },
        { value: "type", name: "type" },
        { value: "date", name: "date" }
      ]} />
      <div className="diskcontrols__view">
        <Button className="diskcontrols__list" onClick={() => dispatch(setView('list'))}/>
        <Button className="diskcontrols__plate" onClick={() => dispatch(setView('plate'))}/>
      </div>

    </div>
  )
}

export default DiskControls