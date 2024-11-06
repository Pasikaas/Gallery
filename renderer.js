async function getRandomUrls(filePath, count) {
    const response = await fetch(filePath);
    const data = await response.text();
    const urls = data.split('\n').filter(Boolean);
    const randomUrls = urls.sort(() => 0.5 - Math.random()).slice(0, count);
    return randomUrls;
 }
 
 async function loadImages() {
    const urlFilePath = 'file:\\\image_urls.txt';
    const urls = await getRandomUrls(urlFilePath, 500);
    const columns = ['col-1'];
    let columnIndex = 0;
 
    urls.forEach(url => {
       const img = document.createElement('img');
       img.src = url;
       img.classList.add('image');
       img.addEventListener('click', () => openDialog(url)); // Mở dialog khi click vào ảnh
 
       const column = document.getElementById(columns[columnIndex]);
       column.appendChild(img);
 
       // Chuyển sang cột tiếp theo, quay lại cột đầu khi đến cuối
       columnIndex = (columnIndex + 1) % columns.length;
    });
 }
 
 // Hàm mở dialog và thay đổi kích thước
 function openDialog(url) {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog');
 
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('dialog-image');
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.dataset.scale = 1; // Lưu trữ tỷ lệ phóng to thu nhỏ
 
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    closeBtn.classList.add('close-btn');
    closeBtn.onclick = () => {
       document.body.removeChild(dialog); // Xóa dialog khi nhấn "X"
    };
 
    dialog.appendChild(closeBtn);
    dialog.appendChild(img);
    document.body.appendChild(dialog);
 
    // Thêm sự kiện lăn chuột để phóng to hoặc thu nhỏ ảnh
    dialog.addEventListener('wheel', (event) => {
       event.preventDefault(); // Ngăn chặn cuộn trang
       const scaleAmount = 0.1; // Kích thước thay đổi mỗi lần lăn chuột
       const newScale = event.deltaY < 0 ? parseFloat(img.dataset.scale) + scaleAmount : parseFloat(img.dataset.scale) - scaleAmount;
 
       // Đảm bảo tỷ lệ không nhỏ hơn 0.1
       if (newScale > 0.1) {
          img.style.transform = `scale(${newScale})`;
          img.dataset.scale = newScale; // Cập nhật tỷ lệ
       }
    });
 }
 
 // Khi DOMContentLoaded, gọi hàm loadImages
 document.addEventListener('DOMContentLoaded', loadImages);
 
