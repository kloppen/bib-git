import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Editable from "./Editable";

class AuthorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const editable = this.props.isEditable;
    const fields = [
      "given",
      "dropping-particle",
      "non-dropping-particle",
      "family",
      "literal"
    ];

    return (
      <div>
        {!!this.props.authorList
          ?this.props.authorList.map((a, index) => (
            <div key={index} className="Author-list-row">
              <div className={editable ? "Author-editable-left" : ""}>
                {fields.map((f) => (
                  <div key={f} className="Author-field">
                    {(editable)
                      ? (<Editable field={f}
                                   value={a[f]}
                                   onEdit={(field, value) => {
                                     this.props.onEditAuthorField(index, field, value)
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
                    <div className="Author-editable-right">
                      <button
                        type="button"
                        onClick={() => {
                          this.props.onDeleteAuthor(index)
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
                onClick={() => this.props.onAddAuthor()}
              >+</button>)
            : (<span/>)
        }
      </div>
    );
  }
}

AuthorsList.PropTypes = {
  authorList: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
    })),
  isEditable: PropTypes.bool.isRequired,
  onEditAuthorField: PropTypes.func.isRequired,
  onDeleteAuthor: PropTypes.func.isRequired,
  onAddAuthor: PropTypes.func.isRequired
};


export default connect()(AuthorsList)
