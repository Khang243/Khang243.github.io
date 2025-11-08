// KHÔNG CẦN import Swal nếu đã nhúng link CDN trong HTML

// --- ĐĂNG KÝ VÀ ĐĂNG NHẬP ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    if (!email || !password) {
      Swal.fire("Lỗi!", "Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    Swal.fire({
      title: "Đăng ký thành công!",
      text: "Bạn sẽ được chuyển đến trang đăng nhập.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "login.html";
    });
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    if (email === savedEmail && password === savedPassword) {
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: `Chào mừng ${email}!`,
        icon: "success",
        confirmButtonText: "Vào trang chính",
      }).then(() => {
        window.location.href = "base.html";
      });
    } else {
      Swal.fire("Sai thông tin! (Email hoặc mật khẩu).", "Vui lòng kiểm tra lại thông tin.", "error");
    }
  });
}

// --- CHỨC NĂNG CHUNG KHI TẢI TRANG ---
document.addEventListener("DOMContentLoaded", () => {
  // Cập nhật Navbar (Đăng nhập/Đăng xuất)
  updateNavbar();

  // Cập nhật số lượng Giỏ hàng trên icon
  updateCartCount();

  // Khởi tạo chức năng tìm kiếm (chỉ cần ở base.html hoặc cart.html)
  if (document.getElementById("searchInput")) {
      initSearch();
      initCartListeners();
  }

  // Nếu đang ở trang cart.html, hiển thị giỏ hàng
  if (window.location.pathname.endsWith('cart.html')) {
    renderCart();
  }
});

