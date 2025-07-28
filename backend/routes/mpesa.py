from flask import Blueprint, request, jsonify
import requests
import base64
from datetime import datetime

mpesa_bp = Blueprint('mpesa', __name__)

# Replace with your Daraja sandbox credentials
CONSUMER_KEY = 'qXYyRAo9Y0PjnPsKqQW2fAdk4PzHOpoWwLAYry6vwZ0YEAqB'
CONSUMER_SECRET = 'NaHHJS2j5nKW7sNiWfKLokS2lf2Ow6oYruvWnfVDBVoz0rFgmAtskCIxmb2GzxSu'
BUSINESS_SHORTCODE = '174379'
PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
CALLBACK_URL = 'https://yourdomain.com/api/mpesa/callback'

def get_access_token():
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(url, auth=(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json()['access_token']

@mpesa_bp.route('/stkpush', methods=['POST'])
def stkpush():
    data = request.json
    phone = data['phone']
    amount = data['amount']
    access_token = get_access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((BUSINESS_SHORTCODE + PASSKEY + timestamp).encode()).decode()
    payload = {
        "BusinessShortCode": BUSINESS_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": BUSINESS_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "TravelNestor",
        "TransactionDesc": "Booking Payment"
    }
    headers = {"Authorization": f"Bearer {access_token}"}
    r = requests.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        json=payload, headers=headers
    )
    return jsonify(r.json())