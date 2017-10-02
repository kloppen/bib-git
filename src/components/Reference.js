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

  // TODO: Idea: only show populated fields in expanded view, but show all fields in edit view

  // TODO: Iterate over an array to add all the fields, rather than having a lot of individual function calls in code

  // TODO: Validation in Editable class (eg. numbers)

  // TODO: Add date variables

  // TODO: Add name variables

  render_expanded_field(field, isTextArea=false) {
    return (
      <div>
      <div className="Ref-list-item-expand-left">{field}</div>
      <div className="Ref-list-item-expand-right">
        <Editable
          value={this.props[field]}
          field={field}
          isTextArea={isTextArea}
          onEdit={(field, value) => this.onEdit(field, value)}
        />
      </div>
      </div>
    )
  }

  render_expanded() {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-expand-left">Author</div>
        <div className="Ref-list-item-expand-right">
          <AuthorList
            authorList={this.props.author}
          />
        </div>

        {this.render_expanded_field("abstract", true)}
        {this.render_expanded_field("annote")}
        {this.render_expanded_field("archive")}
        {this.render_expanded_field("archive_location")}
        {this.render_expanded_field("archive-place")}
        {this.render_expanded_field("authority")}
        {this.render_expanded_field("call-number")}
        {this.render_expanded_field("collection-title")}
        {this.render_expanded_field("container-title")}
        {this.render_expanded_field("container-title-short")}
        {this.render_expanded_field("dimensions")}
        {this.render_expanded_field("DOI")}
        {this.render_expanded_field("event")}
        {this.render_expanded_field("event-place")}
        {this.render_expanded_field("genre")}
        {this.render_expanded_field("ISBN")}
        {this.render_expanded_field("ISSN")}
        {this.render_expanded_field("jurisdiction")}
        {this.render_expanded_field("keyword")}
        {this.render_expanded_field("locator")}
        {this.render_expanded_field("medium")}
        {this.render_expanded_field("note")}
        {this.render_expanded_field("original-publisher")}
        {this.render_expanded_field("original-publisher-place")}
        {this.render_expanded_field("original-title")}
        {this.render_expanded_field("page")}
        {this.render_expanded_field("page-first")}
        {this.render_expanded_field("PMCID")}
        {this.render_expanded_field("PMID")}
        {this.render_expanded_field("publisher")}
        {this.render_expanded_field("publisher-place")}
        {this.render_expanded_field("references")}
        {this.render_expanded_field("reviewed-title")}
        {this.render_expanded_field("scale")}
        {this.render_expanded_field("section")}
        {this.render_expanded_field("source")}
        {this.render_expanded_field("status")}
        {this.render_expanded_field("title")}
        {this.render_expanded_field("title-short")}
        {this.render_expanded_field("URL")}
        {this.render_expanded_field("version")}
        {this.render_expanded_field("chapter-number")}
        {this.render_expanded_field("collection-number")}
        {this.render_expanded_field("edition")}
        {this.render_expanded_field("issue")}
        {this.render_expanded_field("number")}
        {this.render_expanded_field("number-of-pages")}
        {this.render_expanded_field("number-of-volumes")}
        {this.render_expanded_field("volume")}
        {this.render_expanded_field("")}
        {this.render_expanded_field("")}

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
