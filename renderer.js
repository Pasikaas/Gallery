async function getRandomUrls(filePath, count) {
    const response = await fetch(filePath);
    const data = await response.text();
    const urls = data.split('\n').filter(Boolean);
    const randomUrls = urls.sort(() => 0.5 - Math.random()).slice(0, count);
    return randomUrls;
 }
 
 async function loadImages() {
    const urlFilePath = 'https://raw.githubusercontent.com/Pasikaas/Gallery/refs/heads/main/image_urls.txt';
    const urls = await getRandomUrls(urlFilePath, 500);
    const columns = ['col-1'];
    let columnIndex = 0;
 
    urls.forEach(url => {
       const img = document.createElement('img');
       img.src = url;
       img.classList.add('image');
       const column = document.getElementById(columns[columnIndex]);
       column.appendChild(img);
 
       // Chuyển sang cột tiếp theo, quay lại cột đầu khi đến cuối
       columnIndex = (columnIndex + 1) % columns.length;
    });
 }
 
 // Khi DOMContentLoaded, gọi hàm loadImages
 document.addEventListener('DOMContentLoaded', loadImages);
 
