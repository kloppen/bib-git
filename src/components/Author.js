import React from 'react'
import PropTypes from 'prop-types'
import {editReference} from "../actions/index";
import { connect } from 'react-redux'

class Author extends React.Component {
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
    if (this.props.literal !== null && this.props.literal !== "") {
      return (
        <span>this.{this.props.literal}</span>
      )
    } else {
      return (
        <span>{this.props.family}</span>
      )
    }
  }
}

Author.propTypes = {
  family: PropTypes.string,
  given: PropTypes.string,
  'non-dropping-particle': PropTypes.string,
  'dropping-particle': PropTypes.string,
  suffix: PropTypes.string,
  literal: PropTypes.string
};

export default connect()(Author)
