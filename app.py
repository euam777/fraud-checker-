from flask import Flask, render_template, request
import os
from datetime import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# আপলোড ফোল্ডার না থাকলে তৈরি করো
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def report_form():
    return render_template('report.html')

@app.route('/submit', methods=['POST'])
def submit_report():
    fraud_type = request.form.get('fraud-type')
    fraud_name = request.form.get('fraud-name')
    fraud_number = request.form.get('fraud-number')
    fraud_location = request.form.get('fraud-location')
    fraud_details = request.form.get('fraud-details')
    images = request.files.getlist('fraud-screenshot')

    saved_files = []
    for image in images:
        if image.filename != '':
            filename = datetime.now().strftime("%Y%m%d_%H%M%S_") + image.filename
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            saved_files.append(filename)

    with open('reports.txt', 'a', encoding='utf-8') as f:
        f.write(f"\n--- Report at {datetime.now()} ---\n")
        f.write(f"Type: {fraud_type}\n")
        f.write(f"Name: {fraud_name}\n")
        f.write(f"Number: {fraud_number}\n")
        f.write(f"Location: {fraud_location}\n")
        f.write(f"Details: {fraud_details}\n")
        f.write(f"Images: {saved_files}\n")

    return "<h2>✅ রিপোর্ট জমা হয়েছে! ধন্যবাদ।</h2>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
