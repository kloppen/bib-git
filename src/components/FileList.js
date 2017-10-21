import React from 'react'
import PropTypes from 'prop-types'
import Editable from "./Editable";

const FileList = ({files, onEditFileField, onDeleteFile, onAddFile}) => {
  const fileList = files.split(";");

  return (
    <div>
      {!!fileList
        ?fileList.map((f, index) => (
            <div key={index} className="Name-list-row">
              <div className="Name-editable-left">
                <Editable field={"Doesn't matter"}
                          value={f}
                          onEdit={(field, value) => {
                            onEditFileField(index, value)
                          }}
                />
              </div>
              <div className="Name-editable-right">
                <button
                  type="button"
                  onClick={() => {
                    onDeleteFile(index)
                  }}
                >X
                </button>
              </div>
            </div>
          )
        )
        : (<span/>)
      }
      <button
        type="button"
        onClick={() => onAddFile()}
      >Add Manually</button>
    </div>
  );
};

FileList.PropTypes = {
  files: PropTypes.string.isRequired,
  onEditFileField: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  onAddFile: PropTypes.func.isRequired
};

export default FileList
