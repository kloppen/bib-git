import React from 'react'
import PropTypes from 'prop-types'

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.state = {
      isEditing: false//,
      //value: props.value
    }
  }

  checkEnter(e) {
    if(e.key === 'Enter') {
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
      // ** Update "text" property with new value (this fires render() again)
      //value: val,
      editing: false
    });
    if(this.props.onEdit) {
      this.props.onEdit(val);
    }
  }

  cancel() {
    this.setState({
      editing: false
    })
  }

  renderNormal() {
    // ** Render "state.text" inside your <p> whether its empty or not...
    return (
      <span onClick={this.edit}>
        {this.props.value}
      </span>
    )
  }

  renderForm() {
    return (
        <input
          ref="newText"
          defaultValue={this.props.value}
          onBlur={this.save}
          onKeyDown={this.checkEnter}
          autoFocus={true}
        />
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderForm()
    } else {
      return this.renderNormal()
    }
  }
}

Editable.PropTypes = {
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Editable