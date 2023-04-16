import { Nav } from 'react-bootstrap';
import '../main/main.css';

const Sidebar = (props: any) => {
  return (
    <Nav className='d-none d-md-block bg-light sidebar' activeKey='/'>
      <div className='sidebar-sticky'></div>
      <Nav.Item>
        <Nav.Link href='/categories'>Category</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/discounts'>Discount</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default Sidebar;
