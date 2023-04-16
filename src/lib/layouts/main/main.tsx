import React from 'react';
import './main.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Sidebar from '../sidebar/sidebar';
import { Outlet } from 'react-router';
interface Props {}

const MainLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id='sidebar-wrapper'>
            <Sidebar />
          </Col>
          <Col xs={10} id='page-content-wrapper'>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;
