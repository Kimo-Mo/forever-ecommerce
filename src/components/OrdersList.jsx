import { useEffect, useState } from 'react';
import { useShopContext } from '../customs/useShopContext';
import LoadingProducts from './LoadingProducts';

const OrdersList = () => {
  const [processedOrders, setProcessedOrders] = useState([]);
  const { orders, loadingOrders, updateOrderStatus, products } = useShopContext();

  useEffect(() => {
    if (orders.length > 0 && products?.length > 0) {
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
      setProcessedOrders(orderDetails.sort((a, b) => b.date - a.date));
    }
  }, [orders, products]);

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

  if (loadingOrders) return <LoadingProducts />;

  return (
    <div className="orders-list">
      <h3 className="mb-4 text-uppercase">Manage Orders</h3>
      <div className="d-flex flex-column">
        {processedOrders.length === 0 ? (
          <p className="text-muted text-center py-5">No orders found.</p>
        ) : (
          processedOrders.map((order) => (
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
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 'fit-content' }}
                    name='orderStatus'
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div>
                {order.items.map((item) => {
                  const product = products?.find((p) => p.id === item.itemId);
                  return item.orderedVariants.map((size) => (
                    <div
                      key={`${item.itemId}-${size.size}`}
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
                <div className="mb-2 mb-md-0">
                  <p className="mb-0 text-muted small">
                    <span className="fw-medium h6">Customer:</span> {order.address.firstName}{' '}
                    {order.address.lastName} ({order.address.email})
                  </p>
                  <p className="mb-0 text-muted small">
                    <span className="fw-medium h6">Address:</span> {order.address.street},{' '}
                    {order.address.city}, {order.address.state}, {order.address.zipCode}
                  </p>
                </div>
                <p className="mb-0 fw-bold text-end">Total: ${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersList;
