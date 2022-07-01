import React from 'react'
import './uploader.style.scss'
import UploadFile from './UploadFile/UploadFile'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../UI/Button/Button'
import { hideUploader } from '../../../reducers/uploadReducer'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    const closeHandle = () => {
        dispatch(hideUploader())
    }


    return (
       isVisible && <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <Button className="uploader__close" onClick={closeHandle}>X</Button>
            </div>
            {
                files.map(file => <UploadFile key={file.id} file={file} />)
            }
        </div>
    )
}

export default Uploader