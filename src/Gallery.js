import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Image, Button, Row, Col, Pagination } from 'antd';

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
    fetchImages(9, 0);
  }, []);

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
              <Button type="primary">Buy</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        total={numImages}
        pageSize={9}
        onChange={(newPage, pageSize) => {
          setCurrPage(newPage);
          if (!(newPage in images)) {
            fetchImages(9, (newPage - 1) * pageSize);
          }
        }}
      />
    </div>
  ) 
}

export default Gallery;
