const fs = require('fs');
const path = require('path');
const axios = require('axios');
const puppeteer = require('puppeteer');

async function downloadFromURI(uri) {
  let fileName;
  if (!process.env.FSLG_FILENAME) {
    const uriPaths = uri.split('?')[0].split('/');
    fileName = uriPaths[uriPaths.length - 1];
  } else {
    fileName = process.env.FSLG_FILENAME;
  }
  const dir = path.resolve('./', 'downloaded');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filePath = path.resolve(dir, fileName);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url: uri,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve(filePath);
    });
    writer.on('error', reject);
  });
}

async function generateLinkFromFirefoxSend(filePath, password) {
  const browser = await puppeteer.launch({
    dumpio: true,
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://send.firefox.com', {
    waitUntil: 'networkidle0'
  });
  await page.waitForSelector('label[role="button"]');
  await page.waitFor(1000);
  const inputUploadHandle = await page.$('input[type=file]');
  inputUploadHandle.uploadFile(filePath);
  await page.waitForSelector('button#upload-btn');
  if (password) {
    await page.click('input#add-password');
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', password);
  }
  await page.waitFor(1000);
  await page.click('button#upload-btn');
  const uploadTimeout =
    process.env.FSLG_UPLOAD_TIMEOUT ? Number.parseInt(process.env.FSLG_UPLOAD_TIMEOUT) : 30 * 60 * 1000;
  await page.waitForSelector('input#share-url', { timeout: uploadTimeout });
  const shareLink = await page.$eval('input#share-url', (el) => el.value);
  await browser.close();
  return shareLink;
}

async function main() {
  const fileURI = process.env.FSLG_FILE_URI;
  if (!fileURI) {
    throw new Error('FSLG_FILE_URI environmet variable is required.')
  }
  let filePath = fileURI;
  if (fileURI.indexOf("https://") === 0 || fileURI.indexOf("http://") === 0) {
    console.log('Downloading original file...');
    filePath = await downloadFromURI(fileURI);
    console.log('Downloaded original file.');
  }
  const password = process.env.FSLG_DOWNLOAD_PASSWORD;
  console.log('Generating Firefox Send link...');
  const downloadLink = await generateLinkFromFirefoxSend(filePath, password);
  console.log('Download Link: ', downloadLink);
}

main();
