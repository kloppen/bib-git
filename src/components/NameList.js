import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Editable from "./Editable";

class NameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const editable = this.props.isEditable;
    const subFields = [
      "given",
      "dropping-particle",
      "non-dropping-particle",
      "family",
      "literal"
    ];

    return (
      <div>
        {!!this.props.nameList
          ?this.props.nameList.map((a, index) => (
            <div key={index} className="Name-list-row">
              <div className={editable ? "Name-editable-left" : ""}>
                {subFields.map((f) => (
                  <div key={f} className="Name-field">
                    {(editable)
                      ? (<Editable field={f}
                                   value={a[f]}
                                   onEdit={(subField, value) => {
                                     this.props.onEditNameField(index, subField, value)
                                   }}
                      /> )
                      :
                      (!!a[f]) ? (<span>{a[f]}</span>) : (<span/>)
                    }
                  </div>
                ))}

              </div>
              {
                (editable)
                  ? (
                    <div className="Name-editable-right">
                      <button
                        type="button"
                        onClick={() => {
                          this.props.onDeleteName(index)
                        }}
                      >X
                      </button>
                    </div>
                  )
                  : (<span/>)
              }
            </div>
          )
        )
        : (<span/>)
        }
        {
          (editable)
            ? (
              <button
                type="button"
                onClick={() => this.props.onAddName()}
              >+</button>)
            : (<span/>)
        }
      </div>
    );
  }
}

NameList.PropTypes = {
  nameList: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
    })),
  isEditable: PropTypes.bool.isRequired,
  onEditNameField: PropTypes.func.isRequired,
  onDeleteName: PropTypes.func.isRequired,
  onAddName: PropTypes.func.isRequired
};


export default connect()(NameList)
