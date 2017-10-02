import React from 'react'
import PropTypes from 'prop-types'
import Editable from './Editable'
import AuthorList from './AuthorsList'
import { editReference, showCitation } from "../actions/index";
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

  onCitation() {
    let { dispatch } = this.props;
    let action = showCitation(this.props.id);
    dispatch(action)
  }

  render_expanded() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-expand-left">Author</div>
        <div className="Ref-list-item-expand-right">
          <Editable
            value="author"
            onEdit={(value) => this.props.onEdit("author", value)}
          />
        </div>

        <div className="Ref-list-item-expand-left">Title</div>
        <div className="Ref-list-item-expand-right">
          <Editable
            value={this.props.title}
            onEdit={(value) => this.onEdit("title", value)}
          />
        </div>

        <div className="Ref-list-item-expand-left">Abstract</div>
        <div className="Ref-list-item-expand-right">
          <Editable
            value={this.props.abstract}
            onEdit={(value) => this.onEdit("abstract", value)}
            isTextArea={true}
          />
        </div>

        <div className="Ref-list-item-expand-all">
          <button type="button">Open</button>
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Collapse</button>
        </div>
      </div>
    )
  }

  render_author_list_collapsed() {
    if(!this.props.author) {
      return ""
    }
    return this.props.author.map((author) => {
      if(author.literal) {
        return author.literal
      }
      if(author.family) {
        if(author['non-dropping-particle']) {
          return author['non-dropping-particle'] + " " + author.family
        }
        return author.family
      }
      return ""
    }).join(", ")
  }

  render_collapsed() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-left">
          { this.render_author_list_collapsed() }
        </div>
        <div className="Ref-list-item-middle">
          {this.props.title}
        </div>
        <div className="Ref-list-item-right">
          <button type="button">Open</button>
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Expand</button>
        </div>
      </div>
    )
  }

  render()
  {
    if(this.state.isExpanded) {
      return(this.render_expanded())
    } else {
      return(this.render_collapsed())
    }
  }
}

Reference.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  author: PropTypes.arrayOf(
    PropTypes.shape({
      family: PropTypes.string,
      given: PropTypes.string,
      'non-dropping-particle': PropTypes.string,
      'dropping-particle': PropTypes.string,
      suffix: PropTypes.string,
      literal: PropTypes.string
  }))
};

export default connect()(Reference)
