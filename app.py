from flask import Flask, render_template, request
import os
from datetime import datetime
import psycopg2

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# ডাটাবেজ কানেকশন URL (তোমার Render এর লিংক)
DATABASE_URL = "postgresql://my_new_project_user:QIyLvwntIjwBY5yWXRNTzUarRjHKeYVL@dpg-d3r57rndiees73aqk5vg-a/my_new_project"

# আপলোড ফোল্ডার না থাকলে তৈরি করো
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# ডাটাবেজে টেবিল তৈরি (প্রথমবার রান করলে স্বয়ংক্রিয়ভাবে তৈরি হবে)
def create_table():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS fraud_reports (
                id SERIAL PRIMARY KEY,
                fraud_type TEXT,
                fraud_name TEXT,
                fraud_number TEXT,
                fraud_location TEXT,
                fraud_details TEXT,
                images TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Database table ready!")
    except Exception as e:
        print("❌ Error creating table:", e)

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

    image_list = ', '.join(saved_files)

    # ডাটাবেজে ডেটা ইনসার্ট করা
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO fraud_reports (fraud_type, fraud_name, fraud_number, fraud_location, fraud_details, images)
            VALUES (%s, %s, %s, %s, %s, %s);
        """, (fraud_type, fraud_name, fraud_number, fraud_location, fraud_details, image_list))
        conn.commit()
        cur.close()
        conn.close()
        print("✅ রিপোর্ট ডাটাবেজে সেভ হয়েছে।")
    except Exception as e:
        print("❌ Database insert error:", e)

    return "<h2>✅ রিপোর্ট জমা হয়েছে! ধন্যবাদ।</h2>"

if __name__ == '__main__':
    create_table()  # প্রথমে টেবিল তৈরি চেক করবে
    app.run(host='0.0.0.0', port=5000)
