from flask import Flask, g, request
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

@app.route('/get_num_image_records')
def get_num_image_records():
    if 'db' not in g:
        init_db()
    
    # Fetch number of rows for pagination
    g.cursor.execute("SELECT COUNT(*) as count FROM images")
    num_image_records = dict(g.cursor.fetchone())['count']

    return { 'num_image_records' : num_image_records } 

@app.route('/get_images')
def get_images():
    if 'db' not in g:
        init_db()
    
    limit = request.args.get('limit')
    offset = request.args.get('offset')

    # Fetch rows according to limit and offset
    g.cursor.execute(f'SELECT rowid, * FROM images LIMIT {limit} OFFSET {offset}')
    image_rows = []
    for row in g.cursor.fetchall():
        image_rows.append(dict(row))

    return { 'images' : image_rows } 

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    filename = secure_filename(file.filename)
    file.save(os.path.join('../public/images', f'{time.time()}_{filename}'))
