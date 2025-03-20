// Copyright (C) 2017-2025, Stefan Kloppenborg
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
import { nameSubFields } from '../common/nameSubFields'


const show_date = (date) => {
    if (!date["date-parts"]) {
      return (<span>Malformed date</span>);
    }
    const date_parts = date["date-parts"][0];

    return [
      !!date_parts[0] ? date_parts[0] : "",
      !!date_parts[1] ? date_parts[1] : "",
      !!date_parts[2] ? date_parts[2] : ""
    ].filter(dp => dp !== "").join("/")
};

const show_name_list = (nameList, filterRE) => {
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
                    ? highlighted_text(a[f], filterRE)
                    : (<span/>)
                }
              </div>
            ))}

          </div>
        </div>
      )
    )
 };

const highlight_paragraph = (text, filterRE) => {
    return text.toString()
      .split(filterRE)
      .map((t, index) =>
        t.match(filterRE)
          ? (<span className="Highlighted" key={index}>{t}</span>)
          : t
      );
};

export const highlighted_text = (text, filterRE) => {
    return (text || "").toString().split("\n").map(
      (t, index) => (
        <span key={index} className="Ref-paragraph">
          {
            t === "" ? (<br/>) :
              !filterRE
                ? t
                : highlight_paragraph(t, filterRE)
          }
        </span>
      )
    )
};

export const field_contents = (field, reference_contents, filterRE, hrefRoot) => {
    switch (field.type) {
      case "NAME":
        return (
          <div key={field.field} className="Ref-list-item-expand-row">
            <div className="Ref-list-item-expand-left">{field.field}</div>
            <div className="Ref-list-item-expand-right">
              {
                show_name_list(
                  reference_contents,
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
                highlighted_text(
                  show_date(reference_contents),
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
                reference_contents.split(";").map((fileText, index) => {
                  let fileTitle = "";
                  let fileHREF = "";
                  const fileObj = fileText.split(":");
                  if(fileObj.length === 3) {
                    fileTitle = fileObj[0];
                    fileHREF = hrefRoot + "/" + fileObj[1];
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
                highlighted_text(
                  reference_contents,
                  filterRE
                )
              }
            </div>
          </div>
        );
    }
};
