import axios from 'axios';

import { Card, Image, Button, Row, Col, Pagination, Popconfirm } from 'antd';

const pageImageLimit = 6;

const Gallery = ({
  numImages,
  images,
  setImages,
  currPage,
  setCurrPage,
  fetchImages,
}) => {
  const deleteImage = (rowId) => {
    axios.delete(`/delete_image/${rowId}`)
      .then(() => {
        invalidateCache();
      })
  }

  const invalidateCache = () => {
    setImages({});
    fetchImages(pageImageLimit, (currPage - 1) * pageImageLimit);
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
