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
