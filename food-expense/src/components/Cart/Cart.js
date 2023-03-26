import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
  const [httpError, setHttpError] = useState('');

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const newItem = { ...item, quantity: 1 }
    cartCtx.addItem(newItem);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch('https://react-food-7ad2a-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

    if (!response.ok) {
      setHttpError('Something went wrong!');
    }

    setIsSubmitting(false);
    setDidSubmitted(true);

    cartCtx.resetCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  let cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { isCheckout && <Checkout onConfirm={submitHandler} onClose={props.onClose} /> }
      { !isCheckout && modalActions}
    </>
  );

  if (httpError !== '') {
    cartModalContent = (
      <>
        <p>{httpError}</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
      </>
    )
  }

  if (isSubmitting && !didSubmitted) {
    cartModalContent = (<p>Submitting details to server...</p>);
  }

  if (didSubmitted) {
    cartModalContent = (
      <>
        <p>Data submitted to server...</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
      </>
    )
  }

  return (
    <Modal onClose={props.onClose}>
      {cartModalContent}
    </Modal>
  );
};

export default Cart;
