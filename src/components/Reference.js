import React from 'react'
import PropTypes from 'prop-types'
import Editable from './Editable'
import {editReference} from "../actions/index";
import { connect } from 'react-redux'

class Reference extends React.Component {
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
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-text">
          <span>Expanded: {this.state.isExpanded ? "TRUE" : "FALSE"}</span>
          <div className="Ref-list-item-text-author">
            <Editable
              value="author"
              onEdit={(value) => this.props.onEdit("author", value)}
            />
          </div>
          <div className="Ref-list-item-text-title"
               onClick={this.props.onClick}
               style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>{this.props.title}</div>
          <div className="Ref-list-item-text-title">
            <Editable
              value={this.props.title}
              onEdit={(value) => this.onEdit("title", value)}
            />
          </div>
        </div>
        <div className="Ref-list-item-control">
          <button type="button">Open</button>
          <button type="button">Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Expand</button>
        </div>
      </div>
    )
  }
}

Reference.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default connect()(Reference)
