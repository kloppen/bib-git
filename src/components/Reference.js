import React from 'react'
import PropTypes from 'prop-types'
import AuthorList from './AuthorsList'
import { showCitation, showEditScreen } from "../actions/index";
import { connect } from 'react-redux'
import { referenceFields } from "../common/referenceFields"


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

  onCitation() {
    let { dispatch } = this.props;
    let action = showCitation(this.props.id);
    dispatch(action)
  }

  doEditModal() {
    let { dispatch } = this.props;
    let action = showEditScreen(this.props.id, this.props);
    dispatch(action)
  }

  // TODO: Edit modal - should load from next higher container

  // TODO: Add date variables

  // TODO: Add name variables

  // TODO: Only show populated author fields in expanded view

  // TODO: Make author fields non-editable in expanded view

  // was in the following function
  /*<Editable
      value={this.props[rf.field]}
      field={rf.field}
      isTextArea={!!rf.isTextArea}
      onEdit={(field, value) => this.onEdit(field, value)}
    />
    */

  render_expanded() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-expand-left">Author</div>
        <div className="Ref-list-item-expand-right">
          <AuthorList
            authorList={this.props.author}
          />
        </div>

        {
          referenceFields.filter((rf) => !!this.props[rf.field]).map(
          (rf) =>
            (
              <div key={rf.field} className="Ref-list-item-expand-row">
                <div className="Ref-list-item-expand-left">{rf.field}</div>
                <div className="Ref-list-item-expand-right">
                  {this.props[rf.field]}
                </div>
              </div>
            )
        )
        }

        <div className="Ref-list-item-expand-all">
          <button type="button">Open</button>
          <button type="button" onClick={() => { this.doEditModal() }}>Edit</button>
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
