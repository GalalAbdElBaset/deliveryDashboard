// Mock data for testing
let mockOrders = [
  {
    id: 1,
    customer_name: "Ahmed Mohamed",
    address: "15 El-Nile St, Cairo",
    phone: "01012345678",
    price: 250,
    status: "Pending",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    customer_name: "Sara Ahmed",
    address: "22 El-Maadi, Cairo",
    phone: "01123456789",
    price: 450,
    status: "On The Way",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    customer_name: "Mohamed Ali",
    address: "5 Heliopolis, Cairo",
    phone: "01234567890",
    price: 180,
    status: "Delivered",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    customer_name: "Nourhan Gamal",
    address: "89 Zamalek, Cairo",
    phone: "+201088899900",
    price: 89.99,
    status: "Delivered",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    customer_name: "Omar Khaled",
    address: "45 Dokki, Cairo",
    phone: "+201023456789",
    price: 210,
    status: "On The Way",
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    customer_name: "Youssef",
    address: "12 Nasr City, Cairo",
    phone: "01098765432",
    price: 175.75,
    status: "Pending",
    created_at: new Date().toISOString()
  }
];

class OrderService {
  async getAllOrders() {
    try {
      return { success: true, data: [...mockOrders] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getOrderById(id) {
    try {
      const order = mockOrders.find(o => o.id === parseInt(id));
      if (!order) throw new Error("Order not found");
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createOrder(orderData) {
    try {
      const newOrder = {
        id: mockOrders.length + 1,
        customer_name: orderData.customerName,
        address: orderData.address,
        phone: orderData.phone,
        price: parseFloat(orderData.price),
        status: orderData.status || "Pending",
        created_at: new Date().toISOString()
      };
      mockOrders.unshift(newOrder);
      return { success: true, data: newOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateOrder(id, orderData) {
    try {
      const index = mockOrders.findIndex(o => o.id === parseInt(id));
      if (index === -1) throw new Error("Order not found");
      mockOrders[index] = {
        ...mockOrders[index],
        customer_name: orderData.customerName,
        address: orderData.address,
        phone: orderData.phone,
        price: parseFloat(orderData.price),
        status: orderData.status
      };
      return { success: true, data: mockOrders[index] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const index = mockOrders.findIndex(o => o.id === parseInt(id));
      if (index === -1) throw new Error("Order not found");
      mockOrders[index].status = status;
      return { success: true, data: mockOrders[index] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteOrder(id) {
    try {
      mockOrders = mockOrders.filter(o => o.id !== parseInt(id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getOrderStats() {
    try {
      const stats = {
        total: mockOrders.length,
        pending: mockOrders.filter(o => o.status === "Pending").length,
        onTheWay: mockOrders.filter(o => o.status === "On The Way").length,
        delivered: mockOrders.filter(o => o.status === "Delivered").length
      };
      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

const orderService = new OrderService();
export default orderService;