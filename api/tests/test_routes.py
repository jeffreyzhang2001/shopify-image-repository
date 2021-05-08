import json

# Assert that we get an integer from this route
def test_get_num_image_records(app, client):
  res = client.get('/get_num_image_records')
  assert res.status_code == 200
  assert isinstance(json.loads(res.get_data())['num_image_records'], int)

def test_get_images(app, client):
  res = client.get('/get_images')
  assert res.status_code == 200
  assert isinstance(json.loads(res.get_data())['images'], list)

def test_add_image_success(app, client):
  res = client.post('/add_image', json = { 'name': 'Dog Picture', 'path': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'})
  assert res.status_code == 200
  last_row_id = json.loads(res.get_data())['last_row_id']
  assert isinstance(last_row_id, int)
  # Cleanup
  res = client.delete(f'/delete_image/{last_row_id}')

def test_add_image_with_invalid_url_failure(app, client):
  res = client.post('/add_image', json = { 'name': 'Dog Picture', 'path': 'notADogPictureUrl'})
  assert res.status_code == 404
  expected_error = { 'error': 'The provided path is an invalid URL.' }
  assert expected_error == json.loads(res.get_data(as_text=True))

def test_delete_image_success(app, client):
  # Add an image first
  res = client.post('/add_image', json = { 'name': 'Dog Picture', 'path': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'})
  last_row_id = json.loads(res.get_data())['last_row_id']
  # Delete the newly added image
  res = client.delete(f'/delete_image/{last_row_id}')

def test_delete_image_invalid_id_failure(app, client):
  res = client.delete('/delete_image/invalidID')
  assert res.status_code == 404
  expected_error = { 'error': 'The requested image could not be deleted. The provided image ID is invalid.' }
  assert expected_error == json.loads(res.get_data(as_text=True))
