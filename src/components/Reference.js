// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from 'react'
import PropTypes from 'prop-types'
import { showCitation, showEditScreen } from "../actions/index";
import { connect } from 'react-redux'
import { referenceFields } from "../common/referenceFields"
import { nameSubFields } from '../common/nameSubFields'
import { generateFieldFilterRE, getFieldFilterRE } from '../common/processFilter'


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
    if (!date["date-parts"]) {
      return (<span>Malformed date</span>);
    }
    const date_parts = date["date-parts"][0];

    return [
      !!date_parts[0] ? date_parts[0] : "",
      !!date_parts[1] ? date_parts[1] : "",
      !!date_parts[2] ? date_parts[2] : ""
    ].filter(dp => dp !== "").join("/")
  }

  show_name_list(nameList, filterRE) {
    if (!nameList) {
      return ""
    }

    return nameList.map((a, index) => (
        <div key={index} className="Name-list-row">
          <div>
            {nameSubFields.map((f) => (
              <div key={f} className="Name-field">
                {
                  !!a[f]
                    ? this.highlighted_text(a[f], filterRE)
                    : (<span/>)
                }
              </div>
            ))}

          </div>
        </div>
      )
    )
  }

  field_contents(field, filterRE) {
    switch (field.type) {
      case "NAME":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {
                this.show_name_list(
                  this.props.reference[field.field],
                  filterRE
                )
              }
            </div>
          </div>
        );
      case "DATE":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {
                this.highlighted_text(
                  this.show_date(this.props.reference[field.field]),
                  filterRE
                )
              }
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
                  return (
                    <a key={index} href={fileHREF} target="_blank" rel="noopener noreferrer">
                      {
                        filterRE !== null && filterRE.test(fileHREF) ?
                        (<span className="Highlighted" key={index}>{fileTitle}</span>)
                          :
                          fileTitle
                      }
                      <br/>
                    </a>
                  );
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
              {
                this.highlighted_text(
                  this.props.reference[field.field],
                  filterRE
                )
              }
            </div>
          </div>
        );
    }
  }

  render_expanded(filter_list) {
    return (
      <div className="Ref-list-item">
        {
          referenceFields.filter((rf) => !!this.props.reference[rf.field])
            .map( (rf) => this.field_contents(rf, getFieldFilterRE(filter_list, rf.field)) )
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

  render_collapsed(filter_list) {
    return (
      <div className="Ref-list-item">
        <div className="Ref-list-item-1">
          <span className="Ref-list-item-1-row">
            {
              this.highlighted_text(
                this.render_author_list_collapsed(),
                getFieldFilterRE(filter_list, "author")
              )
            }
          </span>
          <span className="Ref-list-item-1-row">
            {
              this.props.reference.number
                ? this.highlighted_text(
                  this.props.reference.number,
                  getFieldFilterRE(filter_list, "number")
                )
                : <span/>
            }
          </span>
        </div>
        <div className="Ref-list-item-2">
          {
            this.highlighted_text(
              (this.props.reference.issued && !!this.props.reference.issued["date-parts"])
              ? this.props.reference.issued["date-parts"][0][0]
                : "",
                getFieldFilterRE(filter_list, "issued")
            )
          }
        </div>
        <div className="Ref-list-item-3">
          {
            this.highlighted_text(
              this.props.reference.title,
              getFieldFilterRE(filter_list, "title")
            )
          }
        </div>
        <div className="Ref-list-item-4">
          <button type="button" onClick={() => { this.onCitation() }}>Citation</button>
          <button type="button" onClick={() => { this.doExpand() }}>Expand</button>
        </div>
      </div>
    )
  }

  highlight_paragraph(text, filterRE) {
    return text.toString()
      .split(filterRE)
      .map((t, index) =>
        t.match(filterRE)
          ? (<span className="Highlighted" key={index}>{t}</span>)
          : t
      );
  }

  highlighted_text(text, filterRE) {
    return (text || "").toString().split("\n").map(
      (t, index) => (
        <span key={index} className="Ref-paragraph">
          {
            t === "" ? (<br/>) :
              !filterRE
                ? t
                : this.highlight_paragraph(t, filterRE)
          }
        </span>
      )
    )
  }

  render() {
    const field_filters = generateFieldFilterRE(this.props.visibilityFilter);

    if(this.state.isExpanded) {
      return(this.render_expanded(field_filters)) // TODO: Update
    } else {
      return(this.render_collapsed(field_filters))
    }
  }
}

Reference.propTypes = {
  reference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  visibilityFilter: PropTypes.array,
  hrefRoot: PropTypes.string.isRequired
};

export default connect()(Reference)
