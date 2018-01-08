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
import {connect} from 'react-redux'
import Editable from "./Editable";
import { nameSubFields } from '../common/nameSubFields'

class EditableNameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        {!!this.props.nameList
          ?this.props.nameList.map((a, index) => (
              <div key={index} className="Name-list-row">
                <div className="Name-editable-left">
                  {nameSubFields.map((f) => (
                    <div key={f} className="Name-field">
                      <Editable field={f}
                                value={a[f]}
                                onEdit={(subField, value) => {
                                  this.props.onEditNameField(index, subField, value)
                                }}
                      />
                    </div>
                  ))}

                </div>
                <div className="Name-editable-right">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.onDeleteName(index)
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
          onClick={() => this.props.onAddName()}
        >+</button>
      </div>
    );
  }
}

EditableNameList.PropTypes = {
  nameList: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
    })),
  onEditNameField: PropTypes.func.isRequired,
  onDeleteName: PropTypes.func.isRequired,
  onAddName: PropTypes.func.isRequired
};


export default connect()(EditableNameList)
