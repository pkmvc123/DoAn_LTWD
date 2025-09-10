console.log("Code By NQH Dev");

//! Logic Loading
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pageLoader");
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = link.getAttribute("href");
      if (!url || url.startsWith("#") || url.startsWith("javascript:")) return;
      e.preventDefault();
      loader.classList.add("active");
      setTimeout(() => {
        window.location.href = url;
      }, 2000);
    });
  });
});

//! Menu Food
const menuFood = document.getElementById("menuFood");
if (menuFood) {
  let toastTimer;
  let toastInterval;
  let toastTime = 2000;

  function showToast(message, status) {
    let toast = document.getElementById("toast");
    let progress = document.getElementById("toast-progress");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.innerHTML = `
      <span id="toast-message"></span>
      <div id="toast-progress"></div>
    `;
      document.body.appendChild(toast);
      progress = document.getElementById("toast-progress");
    }
    document.getElementById("toast-message").textContent = message;

    progress.style.transition = "none";
    progress.style.width = "100%";
    void progress.offsetWidth;
    progress.style.transition = `width ${toastTime}ms linear`;
    progress.style.width = "0%";
    clearTimeout(toastTimer);
    clearInterval(toastInterval);
    toast.classList.add(`${status}`);
    toastTimer = setTimeout(() => {
      toast.classList.remove(`${status}`);
    }, toastTime);
  }

  let listFood = [];

  const tagListFood = document.getElementById("listFood");
  const buyedList = document.getElementById("buyedList");
  const modalTotal = document.querySelector(".modal-total");

  let cart = [];

  function updateCartUI() {
    buyedList.innerHTML = "";
    let total = 0;

    cart.forEach((item, cartIndex) => {
      const unitPrice = Number(item.price) || 0;
      const lineTotal = unitPrice * Number(item.quantity) * 1000;
      total += lineTotal;

      buyedList.innerHTML += `
        <li class="buy-item" data-cart-index="${cartIndex}">
          <span class="buy-name">${item.name}</span>
          <span class="buy-qty">SL: ${item.quantity}</span>
          <span class="buy-line-price">${lineTotal.toLocaleString(
            "vi-VN"
          )}</span>
          <button class="buy-remove" data-index="${cartIndex}">❌</button>
        </li>`;
    });

    modalTotal.innerHTML = `
      <div class="checkout-container">
        <!-- Cột nhập thông tin -->
        <div class="checkout-left">
          <label>
            <input type="text" id="customerName" placeholder="Nhập tên...">
          </label>
          <label>
            <input type="text" id="customerPhone" placeholder="Số điện thoại...">
          </label>
          <label>
            <textarea id="customerNote" placeholder="Ghi chú: Có thể bỏ qua..."></textarea>
          </label>
        </div>

        <div class="checkout-total">
          <div class="checkout-label">Thành tiền</div>
          <div class="checkout-amount">${total.toLocaleString(
            "vi-VN"
          )} VNĐ</div>
          <div class="modal-actions">
            <button id="btnCheckout">Đặt đơn</button>
          </div>
        </div>
      </div>
    `;

    const removeBtns = buyedList.querySelectorAll(".buy-remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          cart.splice(idx, 1);
          updateCartUI();
        }
      });
    });
  }

  // Đặt Đơn
  document.addEventListener("click", async (e) => {
    if (e.target && e.target.id === "btnCheckout") {
      const name = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const note = document.getElementById("customerNote").value.trim();

      if (!name || !phone) {
        showToast("Vui lòng nhập đầy đủ thông tin", "error");
        return;
      }

      const totalText = document.querySelector(".checkout-amount").textContent;
      const totalPrice = Number(totalText.replace(/\D/g, ""));

      try {
        const res = await fetch("/api/post-orders-food", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_name: name,
            customer_phone: phone,
            note,
            total_price: totalPrice,
            cart: cart.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        });

        const data = await res.json();
        if (res.ok) {
          showToast(`Đặt Đơn thành công! Mã đơn: ${data.orderId}`, "success");
          cart = [];
          updateCartUI();
          document.getElementById("customerName").value = "";
          document.getElementById("customerPhone").value = "";
          document.getElementById("customerNote").value = "";
          modalBox.classList.remove("active");
          modalOverlay.classList.remove("active");
        } else {
          console.log("Đặt đơn Error:", data.message);
          showToast("Đặt Đơn thất bại!", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Lỗi kết nối server!", "error");
      }
    }
  });

  // Load List Food
  async function loadFood() {
    try {
      const response = await fetch("/api/get-list-food");
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        listFood = result.data;
      }
      tagListFood.innerHTML = "";
      listFood.forEach((itemFood, index) => {
        const safeId = itemFood.id ?? `food-${index}`;
        let ribbonHtml = "";
        switch (itemFood.status) {
          case 1:
            ribbonHtml = `<span class="food-ribbon ribbon-new">New</span>`;
            break;
          case 2:
            ribbonHtml = `<span class="food-ribbon ribbon-best">Sellest</span>`;
            break;
          case 3:
            ribbonHtml = `<span class="food-ribbon ribbon-sale">Sale</span>`;
            break;
          case 4:
            ribbonHtml = `<span class="food-ribbon ribbon-limited">Limited</span>`;
            break;
          case 5:
            ribbonHtml = `<span class="food-ribbon ribbon-outofstock">Sold Out</span>`;
            break;
          default:
            ribbonHtml = "";
        }

        tagListFood.innerHTML += `
          <div class="food-card" data-index="${index}" data-id="${safeId}">
              ${ribbonHtml}
              <img src="/img/Food.png" alt="" />
              <div class="food-name">${itemFood.name}</div>
              <div class="food-price">${itemFood.price}.000 VNĐ</div>
              <div class="food-actions">
                  <input type="number" value="1" min="1" ${
                    itemFood.status == 5 ? "disabled" : ""
                  }/>
                  <button ${itemFood.status == 5 ? "disabled" : ""}>Buy</button>
              </div>
          </div>`;
      });

      const foodCards = document.querySelectorAll(".food-card");
      foodCards.forEach((card) => {
        const btn = card.querySelector("button");
        const input = card.querySelector("input");
        const idx = Number(card.dataset.index);

        btn.addEventListener("click", () => {
          const qty = parseInt(input.value, 10);

          if (isNaN(qty) || qty < 1 || qty > 99) {
            showToast(`Số lượng không hợp lệ!`, "error");
            input.value = 1;
            return;
          }
          const food = listFood[idx];
          if (!food) {
            console.error("Food item not found for index:", idx);
            return;
          }
          const foodId = food.ID ?? `food-${idx}`;
          const unitPrice = Number(food.price) || 0;

          const exist = cart.find((i) => i.id === foodId);
          if (exist) {
            exist.quantity = Number(exist.quantity) + qty;
          } else {
            cart.push({
              id: foodId,
              name: food.name,
              price: unitPrice,
              quantity: qty,
            });
          }
          showToast(`Đã thêm "${food.name}" vào giỏ hàng`, "success");
          updateCartUI();
        });
      });
    } catch (err) {
      console.error("Load list Food Error:", err);
    }
  }
  loadFood();

  const modalBtn = document.getElementById("modalBuyed");
  const modalBox = document.getElementById("modalBuyedBox");
  const modalOverlay = document.getElementById("modalOverlay");

  modalBtn.addEventListener("click", () => {
    updateCartUI();
    modalBox.classList.add("active");
    modalOverlay.classList.add("active");
  });

  modalOverlay.addEventListener("click", () => {
    modalBox.classList.remove("active");
    modalOverlay.classList.remove("active");
  });
}
