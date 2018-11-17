// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from 'react'
import PropTypes from 'prop-types'
import Editable from "./Editable";
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '300px',
    width                 : '350px'
  }
};

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingFilePickerModal: false,
      fileToAdd: ""
    };
  }

  closeModal() {
    this.setState({
      ...this.state,
      isShowingFilePickerModal: false
    })
  }

  openModal() {
    this.setState({
      ...this.state,
      isShowingFilePickerModal: true,
      fileToAdd: ""
    })
  }

  fileLink(fileText, index) {
    let fileHREF = "";
    const fileObj = fileText.split(":");
    if(fileObj.length === 3) {
      fileHREF = this.props.hrefRoot + "/" + fileObj[1];
    } else {
      fileHREF = fileObj[0];
    }

    return (<a key={index} href={fileHREF} target="_blank" rel="noopener noreferrer">Open File<br/></a>)
  }

  render() {
    const fileList = !!this.props.files ? this.props.files.split(";") : [];

    return (
      <div>
        {!!fileList
          ? fileList.map((f, index) => (
              <div key={index} className="Name-list-row">
                <div className="Name-editable-left">
                  <Editable field="file"
                            value={f}
                            onEdit={(field, value) => {
                              this.props.onEditFileField(index, value)
                            }}
                  />
                  <div className="Name-editable-left-link">{this.fileLink(f, index)}</div>
                </div>
                <div className="Name-editable-right">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.onDeleteFile(index)
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
          onClick={() => this.openModal()}
        >Add File
        </button>
        <Modal
          isOpen={this.state.isShowingFilePickerModal}
          onAfterOpen={() => {}}
          onRequestClose={() => {
            this.setState({
              ...this.state,
              isShowingFilePickerModal: false
            })}}
          style={customStyles}
          contentLabel="Add File"
        >
          <div>Select file to add:</div>
          <Select
            name="filePicker"
            value={this.state.fileToAdd}
            options={
              this.props.allowableFileList
                .map(f =>
                  ({value: [f["file_name"], f["path"], f["mime_type"]].join(":"), label: f["path"]}))
                .filter(f => (!this.props.files || this.props.files.split(";")
                  .filter(curF => f.value === curF)
                  .length === 0
                ))
            }
            onChange={val => {
              this.setState({
                ...this.state,
                fileToAdd: !!val ? val.value : ""
              })
            }}
          />
          <div>
            <button
              type="button"
              onClick={() => {
                const fileToAdd = this.state.fileToAdd;
                if(fileToAdd === "") {
                  return
                }

                this.props.onAddFile(fileToAdd);

                this.closeModal()
              }}
            >Add</button>
            <button
              type="button"
              onClick={() => this.closeModal()}
            >Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }
}

FileList.PropTypes = {
  files: PropTypes.string.isRequired,
  onEditFileField: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  onAddFile: PropTypes.func.isRequired,
  allowableFileList: PropTypes.array.isRequired,
  hrefRoot: PropTypes.string.isRequired
};

export default FileList
