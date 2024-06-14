import React, { Component } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.scss";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const id = nanoid();

    this.props.onSubmit({ id, name, number });

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css["form-container"]}>
        <label htmlFor="name" id="label">
          Name
        </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Z '\-]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="number" id="label">
          Number
        </label>
        <input
          type="tel"
          name="number"
          pattern="^\+?[0-9\(\) \-]+$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
