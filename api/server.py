from flask import Flask, g
import os
import sqlite3
import time

app = Flask(__name__)

# Establishes connection to db and associated cursor
def init_db():
    g.db = sqlite3.connect('database.db')
    # Use sqlite3.Row type to get name-based access to columns
    g.db.row_factory = sqlite3.Row
    g.cursor = g.db.cursor()

@app.route('/get_images')
def index():
    if 'db' not in g:
        init_db()
    g.cursor.execute("SELECT rowid, * FROM images")
    image_rows = []
    for row in g.cursor.fetchall():
        image_rows.append(dict(row))
    return { 'images' : image_rows } 

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    filename = secure_filename(file.filename)
    file.save(os.path.join('../public/images', f'{time.time()}_{filename}'))
