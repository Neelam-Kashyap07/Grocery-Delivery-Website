import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load Orders When User Logs In
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <p className="text-2xl md:text-3xl font-medium">My Orders</p>

      {myOrders.map((order) => (
        <div
          key={order._id}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          {/* Order Info */}
          <p className="flex justify-between items-center gap-6">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ₹{order.amount}</span>
          </p>

          {/* Order Items */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-800/70 ${
                order.items.length !== index + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5`}
            >
              {/* Product Details */}
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>

                <div className="ml-4">
                  <h2 className="text-xl font-medium">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Category: {item.product.category}
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="text-lg font-medium">
                <p>Quantity: {item.quantity || 1}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {/* Amount */}
              <p className="text-lg font-semibold">
                Amount: ₹{item.product.price * (item.quantity || 1)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
