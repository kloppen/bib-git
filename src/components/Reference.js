import React from 'react'
import PropTypes from 'prop-types'
import NameList from './NameList'
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
    let action = showEditScreen(this.props.id);
    dispatch(action)
  }

  // TODO: Add date variables

  // TODO: Add name variables

  field_contents(field) {
    switch (field.type) {
      case "NAME":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              <NameList
                field={field.field}
                nameList={this.props[field.field]}
                isEditable={false}
              />
            </div>
          </div>
        );
      default:
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {this.props[field.field]}
            </div>
          </div>
        );
    }
  }

  render_expanded() {
    return (
      <div className="Ref-list-item">
        {
          referenceFields.filter((rf) => !!this.props[rf.field]).map(
            (rf) => this.field_contents(rf)
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
  title: PropTypes.string,
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
