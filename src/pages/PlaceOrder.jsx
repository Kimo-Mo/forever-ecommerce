import { toast } from 'react-toastify';
import CartTotal from '../components/CartTotal';
import { useShopContext } from '../customs/useShopContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../customs/useAuth';
import { useState } from 'react';
import { db } from './../firebase';
const PlaceOrder = () => {
  const { getCartAmount, setCartItems, cartItems, fetchAllOrders } = useShopContext();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();
  const handlePlaceOrder = async (e) => {
    const orderData = {
      userId: currentUser?.uid,
      items: cartItems,
      address: formData,
      totalPrice: getCartAmount() + 10,
      status: 'Order Placed',
      date: Date.now(),
    };
    e.preventDefault();
    if (getCartAmount() === 0) {
      toast.error('Add Products to cart first!');
      return;
    }
    if (!currentUser) {
      toast.error('Please Login First!');
      return;
    }
    try {
      await addDoc(collection(db, 'orders'), orderData);
      localStorage.removeItem('cartItems');
      setCartItems({});
      await fetchAllOrders();
      toast.success('This Order is Placed successfully.');
      navigate('/OrderHistory');
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.');
    }
  };
  return (
    <div className="placeOrder pt-5 border-top">
      <div className="d-flex align-items-center justify-content-start gap-3 mb-5">
        <h3 className="m-0">
          <span className="text-secondary">DELIVERY</span> INFORMATION
        </h3>
        <p
          className="m-0"
          style={{
            width: '2rem',
            height: '2px',
            backgroundColor: 'black',
          }}></p>
      </div>
      <form onSubmit={(e) => handlePlaceOrder(e)} className="d-flex flex-column flex-md-row gap-5">
        <div style={{ flex: '1' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Second Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="col-12">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="zipCode"
                className="form-control"
                placeholder="ZIP Code"
                required
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div className="col-12">
              <input
                type="number"
                name="phone"
                className="form-control"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div style={{ flex: '1' }}>
          <CartTotal />
          <button
            type="submit"
            className="btn bg-dark text-light py-2 px-4 ms-auto mt-4 d-block text-uppercase"
            style={{ width: 'fit-content' }}>
            Place order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
