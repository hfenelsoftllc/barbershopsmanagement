import {useState, useEffect} from 'react';
import {getAllEmployees} from './client';
import './App.css';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin, Empty
} from 'antd';
import './dashboard.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'FirstName',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'LastName',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Place Of Birth',
        dataIndex: 'placeOfBirth',
        key: 'placeOfBirth',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
];
//spinner
const antIcon = <LoadingOutlined style={{fontSize:24}} spin />

function App() {

    const [employees, setEmployees] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchEmployees =()=>
        getAllEmployees()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEmployees(data);
                setFetching(false);
            })

   // const dashboard = new Dashboard();
    //use for singleton or single call
    useEffect(()=>{
        console.log("component mount");
        fetchEmployees();
    }, []);

    const renderEmployees = () =>{
        if(fetching){
            return <Spin indicator={antIcon} />
        }
        if (employees.length <= 0){
            return <Empty />;
        }
        return <Table dataSource={employees}
                      columns = {columns}
                      bordered
                      title={() =>'Employees'}
                      pagination={{pageSize:25}}
                      scroll={{y:240 }}
                      rowKey={(employee) => employee.id}
        />;
    }

 // Layout
    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Report
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Calendar
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Appointment">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Employee">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                    {renderEmployees()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Freedom Barber ©Date.now.utc Created by hfenelsoftllc</Footer>
        </Layout>
    </Layout>

    /*return employees.map((employee, index) =>{
        return<p key={index}>{employee.id} - {employee.firstName} , {employee.lastName}</p>;
    })*/
}

export default App;
