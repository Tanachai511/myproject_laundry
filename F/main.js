
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


function register() {
    // ดึงค่าที่ป้อนเข้ามาจากฟอร์ม
    let username = document.getElementById('RegisterUsername').value;
    let password = document.getElementById('Registerpassword').value;

    // ตรวจสอบว่ามีข้อมูลที่ป้อนมาหรือไม่
    if (username && password) {
        // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือฐานข้อมูล เพื่อทำการลงทะเบียน
        // ในที่นี้คุณสามารถใช้ fetch API หรือ axios เพื่อส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์
        // ตัวอย่าง fetch API:
        fetch('http://127.0.0.1:9000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                username: username
            })
        })
        .then(response => {
            // ตรวจสอบสถานะของคำขอ
            if (!response.ok) {
                throw new Error('ไม่สามารถลงทะเบียนได้');
            }
            return response.json(); // ส่งค่า json ที่รับกลับไป
        })
        .then(data => {
            // สามารถทำอย่างไรก็ได้หลังจากลงทะเบียนสำเร็จ
            alert('ลงทะเบียนสำเร็จ');
            console.log(data); // สามารถลองดูข้อมูลที่ได้รับได้ที่คอนโซล
            window.location.href = './login.html'
        })
        .catch(error => {
            // แสดงข้อความข้อผิดพลาดถ้ามี
            console.error('เกิดข้อผิดพลาด:', error);
            alert('เกิดข้อผิดพลาดในการลงทะเบียน');
        });
    } else {
        // แสดงข้อความแจ้งเตือนถ้าข้อมูลไม่ครบ
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
}

// Login function
function login() {
    // ดึงค่าจาก input ของชื่อผู้ใช้และรหัสผ่าน
    let username = document.getElementById('Username').value;
    let password = document.getElementById('password').value;

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อตรวจสอบการล็อกอิน
    fetch('http://127.0.0.1:9000/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            username: username
        })
    })
    .then(response => response.json())
    .then(data => {
        // ตรวจสอบว่ามี accessToken หรือไม่
        if (data.accessToken) {
            // หากมี accessToken แสดงว่าล็อกอินสำเร็จ
            alert('เข้าสู่ระบบสำเร็จ!');
            window.location.href = './index.html'
            // สามารถทำอะไรต่อได้ตามที่ต้องการ เช่น เปลี่ยนหน้าไปยังหน้าหลัก
        } else {
            // หากไม่มี accessToken แสดงว่าล็อกอินไม่สำเร็จ
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!');
        }
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาดในการล็อกอิน:', error);
        alert('เกิดข้อผิดพลาดในการล็อกอิน!');
    });
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
