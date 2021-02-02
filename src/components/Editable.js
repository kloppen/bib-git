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

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  checkEnter(e) {
    if(e.key === 'Enter' && !this.props.isTextArea) {
      this.save()
    } else if(e.key === 'Escape') {
      this.cancel()
    }
  }

  edit() {
    this.setState({
      editing: true
    })
  }

  save() {
    let val = this.refs.newText.value;
    this.setState({
      editing: false
    });
    if(this.props.onEdit) {
      this.props.onEdit(this.props.field, val);
    }
  }

  cancel() {
    this.setState({
      editing: false
    })
  }

  renderNormal() {
    return (
      <span onClick={() => { this.edit() }}>
        {!this.props.value || this.props.value === "" ?
          (<span className="Editable-empty">{ this.props.field }</span>)
          : this.props.value.toString().split("\n").map(
            (t, index) => (<span key={index} className="Editable-paragraph">{t === "" ? (<br/>) : t}</span>)
          )
        }
      </span>
    )
  }

  renderForm() {
    return (
      <input
        ref="newText"
        defaultValue={this.props.value}
        onBlur={() => { this.save() }}
        onKeyDown={(e) => { this.checkEnter(e) }}
        autoFocus={true}
        className="Editable"
      />
    );
  }

  renderTextArea() {
    return (
      <textarea
        ref="newText"
        defaultValue={this.props.value}
        onBlur={() => { this.save() }}
        onKeyDown={(e) => { this.checkEnter(e) }}
        autoFocus={true}
        className="Editable"
      />
    );
  }

  render() {
    if (this.state.editing && this.props.isTextArea) {
      return this.renderTextArea()
    } else if(this.state.editing) {
      return this.renderForm()
    } else {
      return this.renderNormal()
    }
  }
}

Editable.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  isTextArea: PropTypes.bool
};

export default Editable;
