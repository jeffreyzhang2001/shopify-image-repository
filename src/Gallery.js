import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Image, Button, Row, Col, Pagination, Popconfirm } from 'antd';

const pageImageLimit = 6;

const Gallery = () => {
  const [numImages, setNumImages] = useState(0);
  const [images, setImages] = useState({});
  const [currPage, setCurrPage] = useState(1);

  // Fetch and cache number of image records on first load for pagination purposes
  useEffect(() => {
    axios.get('/get_num_image_records')
      .then(res => {
        setNumImages(res.data.num_image_records);
      });
  }, []);

  const fetchImages = (limit, offset) => {
    axios.get('/get_images', { params: { limit, offset }})
      .then(res => {
        setImages(prevImages => ({ ...prevImages, [currPage]: res.data.images }));
      });
  }

  useEffect(() => {
    fetchImages(pageImageLimit, 0);
  }, []);

  const deleteImage = (rowId) => {
    axios.delete(`/delete_image/${rowId}`).then(
      console.log("SUCCESFULLY DELETED")
    )
  }

  return (
    <div>
      <Row gutter={[8, 8]}>
        {images?.[currPage]?.map((image, i) => (
          <Col span={8} className="col" key={i}>
            <Card
              title={image.name}
              style={{ width: 300 }}
            >
              <Image src={image.path} style={{ borderRadius: 4 }}/>
              <Popconfirm
                title="Are you sure you want to delete this image?"
                onConfirm={() => deleteImage(image.rowid)}
                okText="Yes"
              >
                <Button type="primary" danger>Delete</Button>
              </Popconfirm>
            </Card>
          </Col>
        ))} 
      </Row>
      <Pagination
        total={numImages}
        pageSize={pageImageLimit}
        onChange={(newPage, pageSize) => {
          setCurrPage(newPage);
          if (!(newPage in images)) {
            fetchImages(pageImageLimit, (newPage - 1) * pageSize);
          }
        }}
      />
    </div>
  ) 
}

export default Gallery;
