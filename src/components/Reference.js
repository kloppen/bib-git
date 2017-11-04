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
    let action = showCitation(this.props.reference.id);
    dispatch(action)
  }

  doEditModal() {
    let { dispatch } = this.props;
    let action = showEditScreen(this.props.reference.id);
    dispatch(action)
  }

  show_date(date) {
    if(!date["date-parts"]) {
      return (<span>Malformed date</span>);
    }
    const date_parts = date["date-parts"][0];

    return (
      <span>
        {
          [
            !!date_parts[0] ? date_parts[0]: "",
            !!date_parts[1] ? date_parts[1]: "",
            !!date_parts[2] ? date_parts[2]: ""
          ].filter(dp => dp!=="").join("/")
        }

      </span>
    )
  }

  field_contents(field) {
    switch (field.type) {
      case "NAME":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              <NameList
                field={field.field}
                nameList={this.props.reference[field.field]}
                isEditable={false}
              />
            </div>
          </div>
        );
      case "DATE":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              { this.show_date(this.props.reference[field.field]) }
            </div>
          </div>
        );
      case "FILE":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {
                this.props.reference[field.field].split(";").map((fileText, index) => {
                  let fileTitle = "";
                  let fileHREF = "";
                  const fileObj = fileText.split(":");
                  if(fileObj.length === 3) {
                    fileTitle = fileObj[0];
                    fileHREF = this.props.hrefRoot + "/" + fileObj[1];
                  } else {
                    fileTitle = fileObj[0];
                    fileHREF = fileObj[0];
                  }

                  return (<a key={index} href={fileHREF} target="_blank">{fileTitle}<br/></a>)
                })
              }
            </div>
          </div>
        );
      default:
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {this.props.reference[field.field]}
            </div>
          </div>
        );
    }
  }

  render_expanded(uprFilter) {
    return (
      <div className="Ref-list-item">
        {
          referenceFields.filter((rf) => !!this.props.reference[rf.field])
            .map( (rf) => this.field_contents(rf) )
        }
        <div className="Ref-list-item-expand-all">
          <button type="button" onClick={() => { this.doEditModal() }}>Edit</button>
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Collapse</button>
        </div>
      </div>
    )
  }

  render_author_list_collapsed() {
    if(!this.props.reference.author) {
      return ""
    }
    return this.props.reference.author.map((author) => {
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

  render_collapsed(uprFilter) {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-1">
          { this.render_author_list_collapsed() }
        </div>
        <div className="Ref-list-item-2">
          {
            (this.props.reference.issued && !!this.props.reference.issued["date-parts"])
            ? this.props.reference.issued["date-parts"][0][0]
              : ""
          }
        </div>
        <div className="Ref-list-item-3">
          {this.highlighted_text(this.props.reference.title, uprFilter)}
        </div>
        <div className="Ref-list-item-4">
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Expand</button>
        </div>
      </div>
    )
  }

  highlighted_text(text, uprFilter) {
    if(!text || !uprFilter || uprFilter.length === 0) {
      return text
    }

    return (
      <span>
        {
          (
            text.match(/(\S+)(\s+)+/g) || [])
            .map(s => {
              return {
                "string": s,
                "shouldHighlight": uprFilter
                  .map(flt => s.toUpperCase().includes(flt))
                  .reduce((v, pv) => v || pv, false)
              }
            })
            .map((word, index) =>
              word.shouldHighlight
                ? <span className="Highlighted" key={index}>{word.string}</span>
                : word.string
            )
        }
      </span>
    )
  }

  render() {
    const uprFilter = this.props.visibilityFilter.toUpperCase().match(/\S+/g) || [];  // since match returns null if no match

    if(this.state.isExpanded) {
      return(this.render_expanded(uprFilter))
    } else {
      return(this.render_collapsed(uprFilter))
    }
  }
}

Reference.propTypes = {
  reference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  visibilityFilter: PropTypes.string,
  hrefRoot: PropTypes.string.isRequired
};

export default connect()(Reference)
