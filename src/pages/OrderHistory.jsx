import { useEffect, useState } from 'react';
import { useShopContext } from '../customs/useShopContext';
import { useAuth } from '../customs/useAuth';
import LoadingProducts from '../components/LoadingProducts';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { orders, loadingOrders, products } = useShopContext();
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/Authentication');
    }
  }, [currentUser, isLoading, navigate]);

  useEffect(() => {
    if (orders.length > 0 && currentUser) {
      const getOrderDetails = () => {
        return orders.map((order) => {
          const orderItems = Object.entries(order.items).map(([itemId, sizes]) => {
            const productDetails = products.find((p) => p.id === itemId);

            const sizeDetails = Object.entries(sizes).map(([size, quantity]) => ({
              size,
              quantity,
            }));

            return {
              ...productDetails,
              orderedVariants: sizeDetails,
              itemId,
            };
          });

          return {
            ...order,
            items: orderItems,
          };
        });
      };
      const orderDetails = getOrderDetails();
      setUserOrders(
        orderDetails
          .filter((order) => order.userId === currentUser.uid)
          .sort((a, b) => b.date - a.date)
      );
    }
  }, [orders, currentUser, products]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-primary';
      case 'Packing':
        return 'bg-warning';
      case 'Shipped':
        return 'bg-info';
      case 'Delivered':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  if (loadingOrders || isLoading) return <LoadingProducts />;

  return (
    <div className="pt-5 border-top">
      <div className="d-flex align-items-center justify-content-start gap-3 mb-5">
        <h3 className="m-0">
          <span className="text-secondary">MY</span> ORDERS
        </h3>
        <p
          className="m-0"
          style={{
            width: '2rem',
            height: '2px',
            backgroundColor: 'black',
          }}></p>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven&apos;t placed any orders yet.</p>
          <button className="btn btn-dark px-4" onClick={() => navigate('/collection')}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column">
          {userOrders.map((order) => (
            <div key={order.id} className="border-top border-bottom p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center pb-3 mb-3">
                <div>
                  <h6 className="mb-1 fw-bold">Order ID: {order.id}</h6>

                  <p className="mb-0 text-muted small">
                    Placed on: {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 mt-md-0 d-flex align-items-center gap-2">
                  <span
                    className={`rounded-circle ${getStatusColor(order.status)}`}
                    style={{ width: '10px', height: '10px' }}></span>
                  <span className="fw-medium">{order.status}</span>
                </div>
              </div>

              <div>
                {order.items.map((item) => {
                  const product = products?.find((p) => p.id === item.itemId);
                  return item.orderedVariants.map((size) => (
                    <div
                      key={`${item.itemId}-${size}`}
                      className="d-flex align-items-center gap-3 mb-2">
                      {product?.img && (
                        <img
                          src={product.img}
                          alt={product.title}
                          style={{ width: '60px', height: '60px' }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-medium">{product?.title || 'Product'}</p>
                        <p className="mb-0 text-muted small">
                          Size: {size.size} - Quantity: {size.quantity}
                        </p>
                      </div>
                      <p className="mb-0 fw-bold">
                        ${((product?.price || 0) * size.quantity).toFixed(2)}
                      </p>
                    </div>
                  ));
                })}
              </div>
              <div className="mt-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <p className="mb-0 text-muted small">
                  <span className="fw-medium h6">Address:</span> {order.address.street}, {order.address.city}, {order.address.state},{' '}
                  {order.address.zipCode}
                </p>
                <p className="mb-0 fw-bold text-end">Total: ${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
