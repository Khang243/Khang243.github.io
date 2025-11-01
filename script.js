// ✅ Đảm bảo SweetAlert2 có sẵn

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

    // ✅ Lưu thông tin vào Local Storage
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
      Swal.fire("Sai thông tin!", "Email hoặc mật khẩu không đúng.", "error");
    }
  });
}

// ✅ CHỨC NĂNG TÌM KIẾM VÀ CẬP NHẬT NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  
  // --- BẮT ĐẦU MÃ MỚI ---
  
  /**
   * ✅ Hàm này kiểm tra trạng thái đăng nhập và cập nhật thanh điều hướng (navbar)
   */
  function updateNavbar() {
    const userEmail = localStorage.getItem("userEmail");
    const navList = document.querySelector("#navbarNav .navbar-nav");

    if (!navList) return; // Thoát nếu không tìm thấy navbar

    // Tìm các nút Login và Register
    const loginLink = navList.querySelector('a[href="login.html"]');
    const registerLink = navList.querySelector('a[href="register.html"]');

    if (userEmail) {
      // --- NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP ---

      // 1. Tách tên người dùng từ email (loại bỏ phần @...)
      const username = userEmail.split('@')[0];

      // 2. Ẩn nút "Login" và "Register"
      if (loginLink) loginLink.parentElement.style.display = 'none';
      if (registerLink) registerLink.parentElement.style.display = 'none';

      // 3. Tạo và thêm lời chào "Xin chào, [username]"
      const welcomeItem = document.createElement('li');
      welcomeItem.className = 'nav-item';
      // Dùng class của Bootstrap để tạo kiểu
      welcomeItem.innerHTML = `<span class="nav-link text-dark fw-bold">Xin chào, ${username}</span>`;

      // 4. Tạo và thêm nút "Đăng xuất"
      const logoutItem = document.createElement('li');
      logoutItem.className = 'nav-item';
      logoutItem.innerHTML = `<a class="nav-link" href="#" id="logoutButton" style="cursor: pointer; color: #dc3545;">Đăng xuất</a>`;

      // Thêm các mục mới vào cuối danh sách navbar
      navList.appendChild(welcomeItem);
      navList.appendChild(logoutItem);

      // 5. Thêm sự kiện click cho nút "Đăng xuất"
      const logoutButton = document.getElementById('logoutButton');
      if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Xóa thông tin đăng nhập khỏi Local Storage
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPassword");
          
          // Hiển thị thông báo và chuyển hướng
          Swal.fire({
            title: "Đã đăng xuất",
            text: "Bạn sẽ được chuyển về trang đăng nhập.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "login.html";
          });
        });
      }
      
      // (Bonus) Nếu người dùng đã đăng nhập mà vào trang login/register thì tự động đá về trang chủ
      if (window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('register.html')) {
        window.location.href = 'base.html';
      }

    } else {
      // --- NGƯỜI DÙNG CHƯA ĐĂNG NHẬP ---
      // Đảm bảo nút Login và Register được hiển thị (mặc định)
      if (loginLink) loginLink.parentElement.style.display = 'list-item';
      if (registerLink) registerLink.parentElement.style.display = 'list-item';
    }
  }
  
  // ✅ Gọi hàm để kiểm tra ngay khi trang tải xong
  updateNavbar();

  // --- KẾT THÚC MÃ MỚI ---


  // --- Mã tìm kiếm (giữ nguyên) ---
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsBox = document.getElementById("searchResults");
  const resultsContainer = document.getElementById("resultsContainer");

  if (!searchInput || !searchButton) return;

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    const contents = Array.from(document.querySelectorAll(".product-card .card-body")); 

    let results = [];

    contents.forEach((item) => {
      const title = item.querySelector('.card-title').textContent.toLowerCase();
      if (title.includes(query) && query !== "") {
        results.push(item.innerHTML); 
      }
    });

    resultsContainer.innerHTML = ""; 

    if (results.length > 0) {
      resultsBox.style.display = "block";
      results.forEach((htmlContent) => {
        const div = document.createElement("div");
        div.className = "mb-3 p-2 border rounded"; 
        div.innerHTML = htmlContent;
        if(div.querySelector('.btn')) {
          div.querySelector('.btn').remove();
        }
        resultsContainer.appendChild(div);
      });
    } else if (query !== "") {
      resultsBox.style.display = "block";
      resultsContainer.innerHTML = "<p>There's no results</p>";
    } else {
      resultsBox.style.display = "none";
    }
  });
});