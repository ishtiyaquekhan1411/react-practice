import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cart = useSelector(state => state.cart);
  const items = cart.items;

  return (
    <Card className={classes.cart}>
      {cart.totalQuantity !== 0 && <h2>Your Shopping Cart</h2>}
      {cart.totalQuantity === 0 && <h2>No Item In Cart!</h2>}
      <ul>
        {
          items.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price
              }}
            />
          ))
        }
      </ul>
      {
        cart.totalQuantity !== 0 &&
        <p className={classes['total-amount']}>Total Amount: ${cart.totalAmount.toFixed(2)}</p>
      }
    </Card>
  );
};

export default Cart;
