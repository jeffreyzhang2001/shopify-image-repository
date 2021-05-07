from flask import Flask, g, request
import os
import sqlite3
import time
import json

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
  
  limit = request.args.get('limit') or 100
  offset = request.args.get('offset') or 0

  # Fetch rows according to limit and offset
  g.cursor.execute(f'SELECT rowid, * FROM images LIMIT {limit} OFFSET {offset}')
  image_rows = []
  for row in g.cursor.fetchall():
      image_rows.append(dict(row))

  return { 'images' : image_rows } 

@app.route('/add_image', methods=['POST'])
def add_image():
  if 'db' not in g:
    init_db()

  post_body = json.loads(request.data.decode('utf-8'))
  name = post_body['name']
  path = post_body['path']

  g.cursor.execute(f'INSERT INTO images (name, path) VALUES (\'{name}\', \'{path}\')')
  g.db.commit()
  
  last_row_id = g.cursor.lastrowid
  
  return { 'last_row_id': last_row_id }

@app.route('/delete_image/<image_id>', methods=['DELETE'])
def delete_image(image_id):
  if 'db' not in g:
    init_db()

  g.cursor.execute(f'DELETE FROM images WHERE ROWID = {image_id}')
  g.db.commit()

  return "Image succesfully deleted"
