const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const { promisify } = require('util');
const fontkit = require('@pdf-lib/fontkit');
const readFileAsync = promisify(fs.readFile);

async function addImageAndTextToPDF({
  outputPdfFileName,
  inputImageSignature,
  data = {
    fullName: 'Ông/Bà',
    dob: 'Sinh Ngày',
    id: 'CCCD/Hộ chiếu số',
    issueDate: 'cấp ngày',
    issuePlace: 'tại',
    address: 'Địa chỉ',
    email: 'Email',
    phone: 'Số điện thoại:',
  },
  inputPdfPath = './assets/contracts/root/contract.pdf',
}) {
  try {
    // Đọc file PDF gốc
    const pdfBytes = await readFileAsync(inputPdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);
    let fontBytes = await readFileAsync('./assets/font/Roboto-Medium.ttf');
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

    // Đọc ảnh từ file
    // const imageBytes = await readFileAsync(`${inputImageSignaturePath}`);

    // Lấy trang PDF số 5
    let page = pdfDoc.getPages()[4];

    // Chèn ảnh vào trang PDF
    const image = await pdfDoc.embedPng(inputImageSignature);
    const { width, height } = image.scale(0.3); // Điều chỉnh kích thước ảnh (0.5 là tỷ lệ)

    page.drawImage(image, {
      x: 100, // Vị trí ảnh trên trang PDF
      y: 250,
      width,
      height,
    });

    // Thêm thông tin fullName vào trang PDF
    const textX = 100;
    const textY = 200;
    page.drawText(data.fullName, {
      x: textX,
      y: textY,
      font: ubuntuFont,
      size: 20,
      color: rgb(0, 0, 0), // Màu chữ (đen)
    });
    // ==========================================================================
    //điền thông tin
    fontBytes = await readFileAsync('./assets/font/Roboto-Regular.ttf');
    const font = await pdfDoc.embedFont(fontBytes);

    page = pdfDoc.getPages()[0];

    const fontSize = 12;
    const textColor = rgb(0, 0, 0); // Màu chữ (đen)

    // Điền dữ liệu vào các ô trong form
    page.drawText(data.fullName, {
      x: 150,
      y: 555,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.dob, {
      x: 150,
      y: 535,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.id, {
      x: 190,
      y: 515,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.issueDate, {
      x: 380,
      y: 515,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.issuePlace, {
      x: 465,
      y: 515,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.address, {
      x: 140,
      y: 495,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.email, {
      x: 130,
      y: 475,
      size: fontSize,
      font,
      color: textColor,
    });
    page.drawText(data.phone, {
      x: 160,
      y: 455,
      size: fontSize,
      font,
      color: textColor,
    });

    // Lưu lại file PDF mới
    const pdfBytesWithImageAndText = await pdfDoc.save();
    fs.writeFileSync(
      `./assets/contracts/out/${outputPdfFileName}.pdf`,
      pdfBytesWithImageAndText,
    );

    console.log('Đã tạo file PDF mới thành công!');
    return pdfBytesWithImageAndText;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addImageAndTextToPDF };
