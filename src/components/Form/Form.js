import React, { Component } from 'react';
import style from './Form.module.css';
import shortid from 'shortid';

class Form extends Component {
    state = {
        name: '',
    number: ''
    }

    nameInputId = shortid.generate();
    numberInputId = shortid.generate();

     handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: ''
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={style.form}>
          <label htmlFor={this.nameInputId}>
            <p>Name</p>
        <input
          value={this.state.name}
                        onChange={this.handleChange}
                        id={this.nameInputId}
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
  required
        />
          </label>

          <label htmlFor={this.numberInputId}>
            
        <p>Number</p>
        
            <input
              value={this.state.number}
                        onChange={this.handleChange}
                        id={this.numberInputId}
  type="tel"
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
  required
/>
          </label>

           <button type="submit" className={style.button}>Add contact</button>
        </form>
        );
    }
}

export default Form;