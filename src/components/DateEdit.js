import React from 'react'
import PropTypes from 'prop-types'

class DateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      yyyy: this.get_date_part_from_props(this.props.value, 0),
      mm: this.get_date_part_from_props(this.props.value, 1),
      dd: this.get_date_part_from_props(this.props.value, 2)
    }
  }

  get_date_part_from_props(value, part) {
    if(!value || !value["date-parts"] || !value["date-parts"][0]) {
      return ""
    }
    return value["date-parts"][0][part];
  }

  renderNormal() {
    if (!this.props.value || !this.props.value["date-parts"]) {
      return (
        <span
          className="Editable-empty"
          onClick={() => { this.setState({isEditing: true}) }}
        >
          yyyy/mm/dd
        </span>
      )
    }
    const date_parts = this.props.value["date-parts"][0];
    return (
      <span
        onClick={() => { this.setState({isEditing: true}) }}
      >
        {
          [
            !!date_parts[0] ? date_parts[0] : "",
            !!date_parts[1] ? date_parts[1] : "",
            !!date_parts[2] ? date_parts[2] : ""
          ].filter(dp => dp !== "").join("/")
        }
      </span>
    )
  }

  componentWillUnmount() {
		clearTimeout(this.focusBlurTimeout);
	}

  onBlurTimerHandler() {
    let result = {};

    if(!!this.state.yyyy && this.state.yyyy !== "") {
      result["date-parts"] = result["date-parts"] ? result["date-parts"] : [];
      result["date-parts"][0] = result["date-parts"][0] ? result["date-parts"][0] : [];
      result["date-parts"][0][0] = this.state.yyyy;
    }

    if(!!this.state.mm && this.state.mm !== "") {
      result["date-parts"] = result["date-parts"] ? result["date-parts"] : [];
      result["date-parts"][0] = result["date-parts"][0] ? result["date-parts"][0] : [];
      result["date-parts"][0][0] = result["date-parts"][0][0] && result["date-parts"][0][0] !== ""
        ? result["date-parts"][0][0] : "1";
      result["date-parts"][0][1] = this.state.mm;
    }

    if(!!this.state.dd && this.state.dd !== "") {
      result["date-parts"] = result["date-parts"] ? result["date-parts"] : [];
      result["date-parts"][0] = result["date-parts"][0] ? result["date-parts"][0] : [];
      result["date-parts"][0][0] = result["date-parts"][0][0] && result["date-parts"][0][0] !== ""
        ? result["date-parts"][0][0] : "1";
      result["date-parts"][0][1] = result["date-parts"][0][1] && result["date-parts"][0][1] !== ""
        ? result["date-parts"][0][1] : "1";
      result["date-parts"][0][2] = this.state.dd;
    }

    if(this.props.onEdit) {
      this.props.onEdit(this.props.field, result)
    }

    this.setState({
      isEditing: false,
      yyyy: this.get_date_part_from_props(result, 0),
      mm: this.get_date_part_from_props(result, 1),
      dd: this.get_date_part_from_props(result, 2)
    });
  }

  onBlur(event) {
    event.persist();
    clearTimeout(this.focusBlurTimeout);
    this.focusBlurTimeout = setTimeout(() => this.onBlurTimerHandler(), 16);
  }

  onFocus() {
    clearTimeout(this.focusBlurTimeout);
    this.focusBlurTimeout = setTimeout(() => {
      this.setState({
        isEditing: true,
      });
    }, 16);
  }

  renderForm() {
    return (
      <span>
        <input
          type="text"
          className="DateEdit-yyyy"
          name="yyyy"
          value={this.state.yyyy}
          onBlur={e => this.onBlur(e)}
          onFocus={e => this.onFocus(e)}
          onChange={v => {
            this.setState({yyyy: v.target.value})
          }}
          autoFocus="true"
        />
        <input
          type="text"
          className="DateEdit-xx"
          name="mm"
          value={this.state.mm}
          onBlur={e => this.onBlur(e)}
          onFocus={e => this.onFocus(e)}
          onChange={v => {
            this.setState({mm: v.target.value})
          }}
        />
        <input
          type="text"
          className="DateEdit-xx"
          name="dd"
          value={this.state.dd}
          onBlur={e => this.onBlur(e)}
          onFocus={e => this.onFocus(e)}
          onChange={v => {
            this.setState({dd: v.target.value})
          }}
        />
      </span>
    )
  }

  render() {
    return this.state.isEditing
      ? this.renderForm()
      : this.renderNormal()
  }
}

DateEdit.PropTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default DateEdit;