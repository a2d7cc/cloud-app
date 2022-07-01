import React, { useState } from 'react'
import './popup.style.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setPopUpDisplay } from '../../../reducers/fileReducer'
import FileService from '../../../services/FileService'

const PopUp = () => {
    const dispatch = useDispatch('')
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const parent = useSelector(state => state.files.currentDir)

    const closePopup = () => {
        dispatch(setPopUpDisplay('none'))
    }

    const createDir = () => {
        dispatch(FileService.createFolder(dirName, parent))
        setDirName('')
        dispatch(setPopUpDisplay('none'))
    }

    return (
        <div className="popup" style={{display: popupDisplay}} onClick={closePopup}>
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <Button className="popup__close" onClick={closePopup}>X</Button>
                <h2>Create a folder</h2>
                <Input value={dirName} onChange={e => setDirName(e.target.value)} />
                <Button onClick={createDir}>Create</Button>
            </div>
        </div>
    )
}

export default PopUp