// Copyright (C) 2025, Stefan Kloppenborg
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
import 'react-select/dist/react-select.css';

class LocalFileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fileLink(fileText, index) {
    const fileHREF = this.props.hrefLocalFileRoot + "/" + fileText;
    return (<a key={index} href={fileHREF} target="_blank" rel="noopener noreferrer">Open File<br/></a>)
  }

  render() {
    const fileList = this.props.files !== undefined ? this.props.files.split(";") : [];

    return (
      <div>
        {!!fileList
          ? fileList.map((f, index) => (
              <div key={index} className="Name-list-row">
                <div className="Name-editable-left">
                  <Editable field="local-file"
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
          onClick={() => this.props.onAddFile()}
        >Add Local File
        </button>
      </div>
    )
  }
}

LocalFileList.propTypes = {
  files: PropTypes.string.isRequired,
  onEditFileField: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  onAddFile: PropTypes.func.isRequired,
  hrefLocalFileRoot: PropTypes.string.isRequired
};

export default LocalFileList;
