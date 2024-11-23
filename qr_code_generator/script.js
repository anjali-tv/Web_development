const api_url =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qr-img");
let qrText = document.getElementById("qrText");

function generateQR() {
  if (qrText.value === "") {
    alert("You must write something!");
  } else {
    qrImage.src = api_url + qrText.value;
    // imgBox.classList.add("show-img");
    imgBox.classList.add("show-img");
  }
}
// generateQR();
// To download our image we will use Another API FileSaver.js
let btnDownload = document.querySelector("#mybutton");
let imgdwn = document.querySelector("img");

btnDownload.addEventListener("click", () => {
  let imagePath = imgdwn.getAttribute("src");
  let fileName = getFileName(imagePath);
  saveAs(imagePath, fileName);
});

function getFileName(str) {
  let gotstr = str.substring(str.lastIndexOf("=") + 1);
  let format = ".jpg";
  return gotstr.concat(format);
}
