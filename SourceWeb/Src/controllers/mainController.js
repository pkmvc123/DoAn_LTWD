const connect = require("../configs/connectDB");

//! Method GET
const indexPage = (req, res) => {
  res.render("index");
};

//! Method GET DB
const getListFood = async (req, res) => {
  try {
    // Status 0: Bthg, 1: New, 2: Sellest, 3: Sale, 4: Limited, 5: Hết
    const [listFood] = await connect.query(`
      SELECT ID, name, status, price, created_at
      FROM list_food
      ORDER BY 
        CASE status
          WHEN 3 THEN 1
          WHEN 4 THEN 2
          WHEN 1 THEN 3
          WHEN 2 THEN 4
          WHEN 0 THEN 5
        END,
        created_at DESC;
    `);

    res.json({
      success: true,
      data: listFood,
    });
  } catch (error) {
    console.error("Error loading List Food:", error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Error loading List Food",
    });
  }
};

//! Method POST
const postListFood = async (req, res) => {
  const connection = await connect.getConnection();
  try {
    const { customer_name, customer_phone, note, total_price, cart } = req.body;

    if (!customer_name || !customer_phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    await connection.beginTransaction();

    const queryOrder = `
      INSERT INTO list_order (customer_name, note, total_price, status)
      VALUES (?, ?, ?, ?)
    `;
    const valuesOrder = [customer_name, note || "", total_price || 0, 0];
    const [resultOrder] = await connection.execute(queryOrder, valuesOrder);

    const orderId = resultOrder.insertId;

    const queryDetail = `
      INSERT INTO order_detail (order_id, food_id, quantity)
      VALUES ?
    `;

    const valuesDetail = cart.map((item) => [orderId, item.id, item.quantity]);

    await connection.query(queryDetail, [valuesDetail]);

    await connection.commit();

    res.status(201).json({
      message: "Tạo đơn hàng thành công",
      orderId: orderId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Lỗi tạo đơn:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lưu đơn hàng" });
  } finally {
    connection.release();
  }
};

module.exports = {
  //* Get
  indexPage,
  //* Get Data
  getListFood,
  //* POST
  postListFood,
};
