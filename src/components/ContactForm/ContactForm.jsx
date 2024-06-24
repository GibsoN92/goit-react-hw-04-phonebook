import React, { useState } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.scss";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  name: "",
  number: "",
};

const ContactForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({ ...INITIAL_STATE });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = formState;
    const id = nanoid();

    onSubmit({ id, name, number });

    setFormState({ ...INITIAL_STATE });
  };

  const { name, number } = formState;

  return (
    <form onSubmit={handleSubmit} className={css["form-container"]}>
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
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
