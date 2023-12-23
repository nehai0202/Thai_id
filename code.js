const vision = require('@google-cloud/vision');
const fs = require('fs');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const CREDENTIALS = JSON.parse(JSON.stringify(
    {
        "type": "service_account",
        "project_id": "inductive-world-409011",
        "private_key_id": "a77bfa33205dcc3d50872df65e052e1e5dcba660",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMoXAoWTkiGYf8\n2gS7rjlkV1BHLeY9pZ6HLVRcyHbQ2wJKrzhpnHa4APO25myqdnTBwwv+994HrygA\nF4RT9wE5PVBv7ls3VlmXgKDv0vHNRBY2QwCalChf9ad8bGfEniYl3sYUpW1XIuHN\nSombvyHQbpnCq3YBkZ2Fpd1ny/EMtONNezdXiZglrI5vefqXlNbAhdiUCEfgwSCf\n93HtdP6GKSmgGOH+RXDBWEFpgO8Yr6Tf9bBxovE5iyo+KmZHJHuqfChOmE5uvsP3\nHTnBKHfuUDtdIUqxmq+0URiDJoRMIcMnbjhv6UTV5IwcfQ6NBMba9ze9XjJK8HZ6\n3TaLwXi9AgMBAAECggEABKgx6MErEzMYjLEbhXfwF3ADRDNvt3xy8Kmf72KijZtG\nYJO/SWwFqadf5Iw28eQzQQui1MEoXO1oECR43v5SmU5ja8C1c7tz24ZSY1LeLOk9\nRivdMidoCdMJ5kODUw60WI1K3cJsDB0fnW/yVMiTSO6TckI7s8pwFtARC2ExUbQr\nv/9SIfM6EuFbuNrSstMlr5iHZTMkP4EBzwVlIMFauBI6p9UzabtVVb8979MLqip8\nTbDk+UMmJHEcp2L0VJTH54MU81mxHqOXZGXEP0Zqy78E+ywvDDuK68H4vM4laSt2\nCVLYiUz2tljLheWgmJzVw+Qze+UcdiLgNeIl8hVzUQKBgQDwTRmGcsF2Bujr4b7E\nf1ef7JvlUIDQLlFA2tLrCEEjtUqbh7yg09AGdbHm0+jLRy+HWiTnPsSXzie5x9PZ\nINbFgTXVv1/jV7CjR+eQnwutmfzLZLHomz6c8YcD5QHK+NY2waXr5DxEgv0W4msD\nttj9WLiyzIT8sM6gYUgexZ6axQKBgQDZ/8TKVeqK+S/WAkRBkbNM13s+kv3oWm2W\n0Y0zieS7ww+w12tnBh1aUbrVS4jzoyHOBf8Ds2fDTiqGQr3tQvK+x1taz02e9EMS\nsp16RMFhWAxA/n/+jQhfbp5mL0jRIQbbeXSQJXbuw2mVNGFtOwVcZKRompVZxodj\nJJdweL6lmQKBgQDR0RATg8mGC7x+kYqnOeVBny/zxxniLD8IGMkHLRrrWdU9/gPm\njWta6JMgUDE4pPxL+5qzSuwO/JNVNLS2JmVA6HQgIUxRTfTObO81KJnix8yhr1dk\nGYFPOdjAvsmU9zbbcrQ0RwGUdKcVvzbfdFz8wOXsQIVxudOA19BIBhdZXQKBgHL3\nIc8bFEAKPiH8vAZgUlCZ6xMK7gCVf+njxTWC6S/kJOg8ExYX8W7qXz+RQD5Mr804\n+E35VSV4mZCIriTsA5x9Aj6XyPWlF6JKtCYBEILHrl6wWMvjkKDTc5GsKhiv9C/W\nk5RZTamJQKtBHog+cgtRwCqyK0VXH5s3du4Hn3MxAoGAIl+biCB+kKaCIYsCbvW2\nvLpmLekKi3f0YdjRl8s6s3PtfqgAVkOLUAoFwJ55Rn3bZc/utmZbCFME1upPViMm\n2OWK2NJN2+uOfkZOArPIWF+c5duh+aIBbXep/ihYiQfd6vxmNwjJFGDQdvF13HsT\nhfRb9bSuDhkFbHXlN3mc4Io=\n-----END PRIVATE KEY-----\n",
        "client_email": "qoala-770@inductive-world-409011.iam.gserviceaccount.com",
        "client_id": "102185604840988041837",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/qoala-770%40inductive-world-409011.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      
))

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};
//const vision = require('@google-cloud/vision');



// Create a client with the specified configuration
const client = new vision.ImageAnnotatorClient(CONFIG);
callAnnotateImage = async () => {
  var imageFile = fs.readFileSync('card.jpg_large');
  var encoded = Buffer.from(imageFile).toString('base64');

  const request = {
      "image": {
          "content": encoded
      },
      "features": [
        {
          "type": "TEXT_DETECTION"
        }
      ],
      "imageContext": {
        "languageHints": ["en-t-i0-handwrit"]
      }
  };

  try {
    const [result] = await client.annotateImage(request);

    if (result.fullTextAnnotation && result.fullTextAnnotation.text) {
      const extractedText = result.fullTextAnnotation.text;

      // Define a regular expression pattern to match the desired information
      const pattern = /Thai National ID Card([\s\S]*?)Name([\s\S]*?)Last name ([A-Za-z]+)([\s\S]*?)Date of Birth([\s\S]*?)Date of Issue([\s\S]*?)Date of Expiry([\s\S]*?)(?=\S|$)/;

      // Use the pattern to extract matches from the text
      const matches = extractedText.match(pattern);
      if (matches) {
        // Extracted values may contain extra characters, so we need to clean them up
        const cleanUp = (value) => value.replace(/[\n\s]+/g, ' ').trim();

        // Modify the cleanUp function to include substring operation for the first 16 characters
        const cleanUpWithSubstring = (value, length) => cleanUp(value).substring(0, length);

        const outputJson = {
          identification_number: cleanUpWithSubstring(matches[1], 16),
          name: cleanUp(matches[2]),
          last_name: cleanUp(matches[3]),
          'date-of-birth': cleanUpWithSubstring(matches[5],12),
          'date-of-issue': cleanUp(matches[5]),
          'date-of-expiry': cleanUp(matches[4]), // Note: Update this line if needed
        };

        console.log(JSON.stringify(outputJson, null, 2));
      } else {
        console.log('No relevant information found.');
      }
    } else {
      console.log('No text detected.');
    }
  } catch (error) {
    console.error(error);
  }
}

callAnnotateImage();
//const detectText = async (file_path) => {
//
//    let [result] = await client.textDetection(file_path);
//    console.log(result.fullTextAnnotation.text);
//};
//
//detectText('Sample2.jpg');