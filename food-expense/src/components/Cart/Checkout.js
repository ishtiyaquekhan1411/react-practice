import { useRef, useState } from 'react';
import { isEmpty, isFiveChars } from '../../utils/validations';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formInputValidatity, setFormInputValidatity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const isValidName = !isEmpty(enteredName);
    const isValidStreet = !isEmpty(enteredStreet);
    const isValidCity = !isEmpty(enteredCity);
    const isValidPostalCode = isFiveChars(enteredPostalCode);

    setFormInputValidatity({
      name: isValidName,
      street: isValidStreet,
      postalCode: isValidPostalCode,
      city: isValidCity
    })

    const isFormValid =
      isValidName &&
      isValidStreet &&
      isValidPostalCode &&
      isValidCity

    if (!isFormValid) {
      return;
    }

    // Checkout code
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    })
  }

  const nameControlClasses = `${classes.control} ${
    formInputValidatity.name ? '' : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidatity.street ? '' : classes.invalid
  }`

  const postalCodeControlClasses = `${classes.control} ${
    formInputValidatity.postalCode ? '' : classes.invalid
  }`

  const cityControlClasses = `${classes.control} ${
    formInputValidatity.city ? '' : classes.invalid
  }`

  return (
    <form className={classes.form} onSubmit={() => {}}>
      <div className={nameControlClasses} >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidatity.name && <p className={classes.invalid}>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses} >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidatity.street && <p className={classes.invalid}>Please enter a valid street!</p>}      
      </div>
      <div className={postalCodeControlClasses} >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidatity.postalCode && <p className={classes.invalid}>Please enter a valid postal code (5 characters only)</p>}
      </div>
      <div className={cityControlClasses} >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidatity.city && <p className={classes.invalid}>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes.cancel} onClick={props.onClose}>Cancel</button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout;