const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');

// List of company names and their logo URLs
const companyLogos = {
    "Amazon": "https://cdn-icons-png.flaticon.com/512/3536/3536599.png",
    "Swiggy": "https://cdn.worldvectorlogo.com/logos/swiggy-1.svg",
    "DMart": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/DMart_logo.png/480px-DMart_logo.png",
    "Flipkart": "https://cdn.iconscout.com/icon/free/png-512/flipkart-282594.png",
    "Zomato": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/480px-Zomato_logo.png",
    "Paytm": "https://cdn.iconscout.com/icon/free/png-512/paytm-226448.png",
    "BigBasket": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Bigbasket_logo.png",
    "Reliance Retail": "https://1000logos.net/wp-content/uploads/2020/12/Reliance-Retail-Logo.png",
    "Myntra": "https://upload.wikimedia.org/wikipedia/commons/9/94/Myntra_logo_2019.png",
    "Tata Cliq": "https://1000logos.net/wp-content/uploads/2021/05/Tata-Cliq-Logo.png",
    "Snapdeal": "https://cdn.iconscout.com/icon/free/png-512/snapdeal-569707.png",
    "JioMart": "https://cdn.iconscout.com/icon/free/png-512/jiomart-2710229-2258705.png",
    "Blinkit": "https://blinkit.com/images/blinkit.png",
    "Uber Eats": "https://cdn.iconscout.com/icon/free/png-512/uber-eats-3521183-2944876.png",
    "PhonePe": "https://cdn.iconscout.com/icon/free/png-512/phonepe-225017.png"
};




// Directory to save the logos
const logoDir = './logos';
if (!fs.existsSync(logoDir)) {
    fs.mkdirSync(logoDir);
}

// Download and save the logos
const downloadAndSaveLogo = async (company, url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imgBuffer = Buffer.from(response.data, 'binary');
        
        const outputFormat = url.endsWith('.svg') ? 'svg' : 'png';
        const imgPath = `${logoDir}/${company}.${outputFormat}`;
        
        if (outputFormat === 'svg') {
            fs.writeFileSync(imgPath, imgBuffer);
        } else {
            await sharp(imgBuffer).toFile(imgPath);
        }
        
        console.log(`Saved logo for ${company} at ${imgPath}`);
    } catch (error) {
        console.error(`Error downloading logo for ${company}: ${error.message}`);
    }
};

const downloadAllLogos = async () => {
    for (const [company, url] of Object.entries(companyLogos)) {
        await downloadAndSaveLogo(company.toLowerCase(), url);
    }
};

downloadAllLogos();
