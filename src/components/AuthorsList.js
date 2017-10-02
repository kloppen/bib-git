import React from 'react'
import PropTypes from 'prop-types'
import {editReference} from "../actions/index";
import { connect } from 'react-redux'
import Editable from "./Editable";

class AuthorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }

  doExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  onEdit(key, value) {
    let { dispatch } = this.props;
    let action = editReference(this.props.id, key, value);
    dispatch(action)
  }

  // TODO: Need to add add and subtract buttons for authors...including when authorList is null or undefined
  render()
  {
    if(!this.props.authorList || this.props.authorList.length <= 0) {
      return (<div>&nbsp;</div>)  // TODO: This should show a single author anyways, or the add button, or something
    }
    return (
      <div>
        {this.props.authorList.map((a, index) => (
          <span key={index}>
            <div className="Author-field">
              <Editable
                field="given"
                value={a.given}
              />
            </div>
            <div className="Author-field">
              <Editable
                field="dropping-particle"
                value={a['dropping-particle']}
              />
            </div>
            <div className="Author-field">
              <Editable
                field="non-dropping-particle"
                value={a['non-dropping-particle']}
              />
            </div>
            <div className="Author-field">
              <Editable
                field="family"
                value={a.family}
              />
            </div>
            <div className="Author-field">
              <Editable
                field="suffix"
                value={a.suffix}
              />
            </div>
            <div className="Author-field">
              <Editable
                field="literal"
                value={a.literal}
              />
            </div>
            <br/>
          </span>
        ))}
      </div>
    );
  }
}

AuthorsList.PropTypes = {
  authorList:  PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
  }))
};


export default connect()(AuthorsList)
