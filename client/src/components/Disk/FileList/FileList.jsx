import React from 'react'
import './file-list.style.scss'
import { useSelector } from 'react-redux'
import File from './File/File'

const FileList = () => {
  const files = useSelector(state => state.files.files)
  const view = useSelector(state => state.files.view)


  if(!files.length) {
    return <h2 className='uploadtAttention'>Upload file or simple drag...</h2>
  }  

  if (view === 'list' && files.length) {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        {
          files.map(file => <File key={file.name} file={file} />)
        }
      </div>
    )
  }

  if (view === 'plate'  && files.length) {
    return (
      <div className="fileplate">
        {
          files.map(file => <File key={file.name} file={file} />)
        }
      </div>
    )
}
}

export default FileList