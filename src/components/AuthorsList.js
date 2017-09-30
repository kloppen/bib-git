import React from 'react'
import PropTypes from 'prop-types'
import {editReference} from "../actions/index";
import { connect } from 'react-redux'
import Author from './Author'

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

  render()
  {
    if(this.props.authorList === null || this.props.authorList === undefined) {
      return (<div></div>)
    }
    return (
      <div>
        {this.props.authorList.map((a, index) => (
          <span key={index}>
            <span>Family: {a.family}</span><br/>
            <span>Given: {a.given}</span><br/>
            <span>'non-dropping-particle' {a['non-dropping-particle']}</span><br/>
            <span>'dropping-particle' {a['dropping-particle']}</span><br/>
            <span>suffix: {a.suffix}</span><br/>
            <span>literal: {a.literal}</span><br/>
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
