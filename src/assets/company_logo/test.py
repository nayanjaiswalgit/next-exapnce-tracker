import os
import requests
from PIL import Image
from io import BytesIO

# List of company names and their logo URLs
company_logos = {
    "Amazon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "Swiggy": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swiggy_Logo.svg",
    "DMart": "https://upload.wikimedia.org/wikipedia/en/7/7d/DMart_logo.png",
    "Flipkart": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flipkart_logo.png",
    "Zomato": "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    "Paytm": "https://upload.wikimedia.org/wikipedia/commons/2/23/Paytm_Logo.png",
    "BigBasket": "https://upload.wikimedia.org/wikipedia/commons/5/55/Bigbasket_logo.png",
    "Reliance Retail": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Reliance_Retail_Logo.svg",
    "Myntra": "https://upload.wikimedia.org/wikipedia/commons/8/84/Myntra_logo_2019.png",
    "Tata Cliq": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tata_Cliq_logo.png",
    "Snapdeal": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Snapdeal_Logo.png",
    "JioMart": "https://upload.wikimedia.org/wikipedia/commons/5/59/Jiomart_logo.png",
    "Blinkit": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Blinkit_logo.png",
    "Uber Eats": "https://upload.wikimedia.org/wikipedia/commons/2/23/Uber_Eats_logo_2017.png",
    "PhonePe": "https://upload.wikimedia.org/wikipedia/commons/f/f4/PhonePe_Logo.png"
}

# Directory to save the logos
logo_dir = "./"
os.makedirs(logo_dir, exist_ok=True)

# Download and save the logos
for company, url in company_logos.items():
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img_path = os.path.join(logo_dir, f"{company}.png")
    img.save(img_path, format="PNG")


