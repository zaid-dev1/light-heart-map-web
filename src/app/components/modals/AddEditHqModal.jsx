import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Switch,
  message,
  AutoComplete,
} from "antd";
import { updateLightHQById, createLightHQ } from "../../api/lightHQ";

const AddEditHqModal = ({ visible, mode, data, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState("");
  const [latLon, setLatLon] = useState([]);
  const [options, setOptions] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (mode === "edit" && data) {
      form.setFieldsValue(data);
      setAddress(data.address || "");
      setLatLon([data.latitude || 0, data.longitude || 0]);
    } else {
      form.resetFields();
      setAddress("");
      setLatLon([]);
    }
  }, [mode, data, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        address: address,
        latitude: latLon[0],
        longitude: latLon[1],
      };

      if (mode === "add") {
        await createLightHQ(payload);
        messageApi.success("HQ added successfully!");
        onSave();
      } else if (mode === "edit") {
        await updateLightHQById(payload, data.id);
        messageApi.success("HQ updated successfully!");
        onSave();
      }
    } catch (error) {
      console.error(error);
      messageApi.error(`Failed to ${mode === "add" ? "add" : "edit"} HQ.`);
    }
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    if (window.google) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setOptions(
              predictions.map((prediction) => ({
                value: prediction.description,
                placeId: prediction.place_id,
              })),
            );
          }
        },
      );
    }
  };

  const handleSelect = (value, option) => {
    setAddress(value);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: option.placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setLatLon([location.lat(), location.lng()]);
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title={
        <span className="text-[#746253] text-xl font-light px-8 pt-6">
          {mode === "add" ? "Add New HQ" : "Edit HQ"}
        </span>
      }
      onCancel={onClose}
      footer={null}
    >
      {contextHolder}
      <div className="p-6">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <AutoComplete
              value={address}
              options={options}
              onChange={handleAddressChange}
              onSelect={handleSelect}
              className="w-full"
              style={{ width: "100%" }}
            >
              <Input
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </AutoComplete>
          </Form.Item>
          <Form.Item label="Website Link" name="websiteLink">
            <Input className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg" />
          </Form.Item>
          <Form.Item label="Instagram Account" name="instagramAccount">
            <Input className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg" />
          </Form.Item>
          <Form.Item label="Business Phone" name="businessPhone">
            <Input className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg" />
          </Form.Item>
          <Form.Item
            label="Product Pickup Available"
            name="productPickupAvailable"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2 customCancelButton">
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="customOKButton">
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddEditHqModal;
