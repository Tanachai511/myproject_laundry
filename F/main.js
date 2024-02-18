
let menu = document.querySelector('#menu-icon');
let sidenavbar = document.querySelector('.side-navbar');
let content = document.querySelector('.content');
const accessToken = localStorage.getItem('accessToken');

menu.onclickcontent = () => {
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
    let password = document.getElementById('RegisterPassword').value;

    // ตรวจสอบว่ามีข้อมูลที่ป้อนมาหรือไม่
    if (username && password) {
        // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือฐานข้อมูล เพื่อทำการลงทะเบียน
        // ในที่นี้คุณสามารถใช้ fetch API หรือ axios เพื่อส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์
        // ตัวอย่าง fetch API:
        fetch('http://127.0.0.1:2000/user/signup', {
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
    let username = document.getElementById('Username').value;
    let password = document.getElementById('password').value;

    fetch('http://127.0.0.1:2000/auth/signin', {
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
        if (data.accessToken) {
            alert('เข้าสู่ระบบสำเร็จ!');
            window.location.href = './index.html';
            console.log(accessToken)
            sendData(data.accessToken)
        } else {
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!');
        }
    })
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

//คำนวนราคา
const labels = document.querySelectorAll('.details label');

labels.forEach(label => {
    label.addEventListener('click', () => {
        const quantity = parseInt(label.textContent);
        const price = quantity * 12;
        document.querySelector('.h4').textContent = `สำหรับ${quantity}ชิ้น`;
        document.querySelector('.h1').textContent = `฿${price}`;
    });
});

//บันทึกcart
function sendData() {
    const accessToken = localStorage.getItem('accessToken'); // ดึง accessToken จาก localStorage

    // เรียกใช้ฟังก์ชัน login เพื่อเข้าสู่ระบบและรับ accessToken
    login(accessToken);

    const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
    if (paymentMethodInput) {
        const paymentMethod = paymentMethodInput.value;
        const h1Element = document.querySelector('.h'); // เลือก element ที่มีคลาส 'h'
        const textContent = h1Element ? h1Element.textContent.trim() : ''; // ดึงข้อความภายใน element <h1> และลบช่องว่างที่อยู่รอบข้อความ

        const servicePriceElement = document.querySelector('#result h1');
        const servicePrice = servicePriceElement ? servicePriceElement.innerHTML : '';    

        const FandLname = document.getElementById('FandLname').value;
        const phone = document.getElementById('phone').value;
        const addr = document.getElementById('addr').value;
        const deliveryDate = document.querySelector('.selected').textContent;
        const cartPrice = document.getElementById('cartprice').textContent;
        const status = "unpaid";

        const data = {
            FandLname: FandLname,
            addr: addr,
            phone: phone,
            deliveryDate: deliveryDate,
            status: status,
            cartPrice: cartPrice,
            payment: {
                paymentType: paymentMethod
            },
            service: {
                serviceName: textContent,
                servicePrice: servicePrice
            }
        };

    // ทำการส่งข้อมูลที่เตรียมไว้ไปยัง API โดยใช้ fetch หรือ axios
    fetch('http://127.0.0.1:2000/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // ใส่ accessToken ใน header Authorization
        },
        body: JSON.stringify(data) // แปลงข้อมูลเป็น JSON และส่งไปยัง API
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // ดำเนินการเพิ่มเติมหลังจากที่ส่งข้อมูลสำเร็จ เช่น แสดงข้อความ รีเฟรชหน้า เปลี่ยนหน้า ฯลฯ

        // เพิ่มข้อมูลลงในตาราง tbody
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${FandLname}</td>
            <td>${addr}</td>
            <td>${phone}</td>
            <td>${deliveryDate}</td>
            <td>${cartPrice}</td>
        `;
        tbody.appendChild(tr);
        
        console.log('Cart POST success:', data);
    })
    .catch(error => {
        console.error('There was an error sending the data:', error);
    });
}
}