
let menu = document.querySelector('#menu-icon');
let sidenavbar = document.querySelector('.side-navbar');
let content = document.querySelector('.content');

menu.onclick = () => {
    sidenavbar.classList.toggle('active');
    content.classList.toggle('active');
}

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './index.html'
}


// Registration function
function register() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (username && email && password) {
        alert("ลงทะเบียนสำเร็จ!");
        // ส่วนที่ควรเพิ่ม: บันทึกข้อมูลลงในฐานข้อมูลหรือส่งข้อมูลไปยังเซิร์ฟเวอร์
    } else {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
    }
}

// Login function
function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // เช็คว่าอีเมลที่ป้อนมาได้ทำการลงทะเบียนหรือยัง
    if (!isEmailRegistered(email)) {
        alert("กรุณาลงทะเบียนก่อนทำการล็อกอิน!");
        return;
    }

    // เช็คว่ารหัสผ่านที่ป้อนตรงกับที่ลงทะเบียนไว้หรือไม่
    let registeredUser = getUserByEmail(email);
    if (password === registeredUser.password) {
        alert("เข้าสู่ระบบสำเร็จ!");
        window.location.href = "index.html"; // เด้งกลับไปที่หน้า index.html    } else {
        alert("รหัสผ่านไม่ถูกต้อง!");
    }
}

// Check if email is registered
function isEmailRegistered(email) {
    let registeredEmails = ["registered@email.com", "anotherregistered@email.com"]; // อีเมลที่ลงทะเบียนแล้ว
    return registeredEmails.includes(email);
}

// Get user by email
function getUserByEmail(email) {
    // ส่วนที่ควรเพิ่ม: เข้าถึงข้อมูลผู้ใช้จากฐานข้อมูลหรือจากข้อมูลที่เก็บไว้
    // ในกรณีนี้จะใช้ข้อมูลสมมติเพื่อการแสดงตัวอย่างเท่านั้น
    let registeredUsers = [
        { email: "registered@email.com", password: "password1", username: "User1" },
        { email: "anotherregistered@email.com", password: "password2", username: "User2" }
    ];

    // ค้นหาข้อมูลผู้ใช้ที่ตรงกับอีเมลที่ระบุ
    for (let i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i].email === email) {
            return registeredUsers[i];
        }
    }

    // ถ้าไม่พบผู้ใช้ในฐานข้อมูล
    return null;
}
// ฟังก์ชันเพื่อเปิดโมดัล
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// ฟังก์ชันเพื่อปิดโมดัล
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// เพิ่มเหตุการณ์คลิกให้กับปุ่มปิดในโมดัล
document.querySelectorAll(".modal .close").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
        var modal = closeBtn.closest(".modal");
        closeModal(modal.id);
    });
});


// Function to handle toggling background color
function toggleBackgroundColor(element) {
    // Get all elements with the class "columnin"
    const columninElements = document.querySelectorAll('.columnin');
    
    // Loop through each columnin element
    columninElements.forEach(columnin => {
        // If the current columnin is the clicked element
        if (columnin === element) {
            // Toggle its background color
            if (columnin.style.backgroundColor === 'green') {
                columnin.style.backgroundColor = ''; // Reset to default
            } else {
                columnin.style.backgroundColor = 'green';
            }
        } else {
            // Reset the background color of other columnin elements
            columnin.style.backgroundColor = '';
        }
    });
}
