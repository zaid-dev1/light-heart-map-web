"use client";

import React, { useState, useEffect } from "react";
import { Table, Select, message, Spin, Button, Space } from "antd";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import Loading from "../components/uiComponents/loading";
import AddEditHqModal from "../components/modals/AddEditHqModal";
import { getAllCustomers, updateUserRole } from "../api/user";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

import { getAllLightHQ, deleteLightHQ } from "../api/lightHQ";

const { Option } = Select;

const CustomerTable = () => {
  const [customersData, setCustomersData] = useState([]);
  const [customersPagination, setCustomersPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [hqData, setHqData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const fetchCustomers = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await getAllCustomers(page, pageSize);
      if (response) {
        const updatedCustomers = response?.customers.filter((cus) => cus?.role !== 'admin')
        setCustomersData(updatedCustomers);
        setCustomersPagination({
          current: page,
          pageSize,
          total: response.pagination.total,
        });
      } else {
        messageApi.error(response.message || "Failed to fetch customers.");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Something went wrong while fetching customers!");
    } finally {
      setLoading(false);
    }
  };

  const fetchHqData = async () => {
    setLoading(true);
    try {
      const response = await getAllLightHQ();
      if (response) {
        setHqData(response.data);
      } else {
        messageApi.error(response.message || "Failed to fetch Light Heart HQs.");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Something went wrong while fetching Light Heart HQs!");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const payload = { role: newRole };
      await updateUserRole(id, payload);

      setCustomersData((prevData) =>
        prevData.map((item) =>
          item.customerId === id ? { ...item, role: newRole } : item,
        ),
      );

      messageApi.success("Role updated successfully");
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to update role");
    }
  };

  const handleAddHq = () => {
    setModalData(null);
    setModalMode("add");
    setIsModalVisible(true);
  };

  const handleEditHq = (hq) => {
    setModalData(hq);
    setModalMode("edit");
    setIsModalVisible(true);
  };

  const handleDeleteHq = async (hqId) => {
    try {
      await deleteLightHQ(hqId);
      setHqData((prevData) => prevData.filter((item) => item.id !== hqId));
      messageApi.success("HQ deleted successfully");
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to delete HQ");
    }
  };

  useEffect(() => {
    fetchCustomers(customersPagination.current, customersPagination.pageSize);
    fetchHqData();
  }, [customersPagination.current]);

  const handleTableChange = (paginationInfo) => {
    setCustomersPagination({
      ...customersPagination,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    });
  };

  const customerColumns = [
    {
      title: "Customer Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) =>
        `${record.firstName} ${record.lastName || ""}`.trim(),
    },
    {
      title: "Business Name",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(value) => handleRoleChange(record.customerId, value)}
          className="w-full"
        >
          <Option value="student">Student</Option>
          <Option value="educator">Educator</Option>
          <Option value="partner">Partner</Option>
        </Select>
      ),
    },
  ];

  const hqColumns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Website Link",
      dataIndex: "websiteLink",
      key: "websiteLink",
    },
    {
      title: "Product Pickup Available",
      dataIndex: "productPickupAvailable",
      key: "productPickupAvailable",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Instagram Account",
      dataIndex: "instagramAccount",
      key: "instagramAccount",
    },
    {
      title: "Business Phone",
      dataIndex: "businessPhone",
      key: "businessPhone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <button
            className={`text-primary hover:bg-[#f1e5d8] py-2 px-3 border rounded-lg `}
            onClick={() => handleEditHq(record)}
          >
            <EditFilled style={{ fontSize: "18px", pointerEvents: "none" }} />
          </button>
          <span className="text-customgray-1 ">|</span>

          <button
            className={`text-red-700 hover:bg-[#f1e5d8] py-2 px-3 border rounded-lg `}
            onClick={() => handleDeleteHq(record.id)}
          >
            <DeleteFilled style={{ fontSize: "18px", pointerEvents: "none" }} />
          </button>
        </Space>
      ),
    },
  ];

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <div className="p-4 mt-[5rem]">
      {contextHolder}
      <Spin spinning={loading}>
        <h1 className="text-4xl ml-2 text-center mb-6">Admin Page</h1>
        <h1 className="text-xl text-[#746253] ml-2 mb-3">Customers List</h1>
        <Table
          dataSource={customersData.map((item) => ({ ...item, key: item.id }))}
          columns={customerColumns}
          pagination={{
            current: customersPagination.current,
            pageSize: customersPagination.pageSize,
            total: customersPagination.total,
          }}
          onChange={handleTableChange}
          bordered
          className="shadow-lg bg-white rounded-lg min-w-[650px]"
        />

        <div className="flex justify-between items-center mt-8 mb-4">
          <h2 className="text-xl text-[#746253] ml-2">Light Heart HQs</h2>
          <Button
            type="primary"
            className="bg-primary mt-4"
            onClick={handleAddHq}
          >
            Add New HQ
          </Button>
        </div>
        <Table
          dataSource={hqData.map((item) => ({ ...item, key: item.id }))}
          columns={hqColumns}
          pagination={false}
          bordered
          className="shadow-lg bg-white rounded-lg min-w-[650px]"
        />
      </Spin>

      <AddEditHqModal
        visible={isModalVisible}
        mode={modalMode}
        data={modalData}
        onClose={() => setIsModalVisible(false)}
        onSave={() => {
          fetchHqData();
          setIsModalVisible(false);
        }}
      />
    </div>
  );
};

export default CustomerTable;
