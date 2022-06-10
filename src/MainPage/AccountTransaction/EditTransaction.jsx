
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link ,useHistory ,useParams} from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Card, Col, Row

  } from 'antd';
import { Modal } from "react-bootstrap";
import 'antd/dist/antd.css';

import "../antdstyle.css"
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { baseUrl } from '../../Entryfile/BaseUrl';
import { MultiSelect } from "react-multi-select-component";


const { Option } = Select;
const EditTransaction = () => {
  let params = useParams()
  const [form] = Form.useForm();
    const token = Cookies.get("token")
    const history = useHistory();

    const [accounts, setAccounts] = useState([]);

    const [credit_account_id, setCreditAccountId ]= useState(0);
    const [debit_account_id, setDebitAccountId ]= useState(0);
    const [debit_account_name, setCreditAccountName ]= useState(0);
    
    const [transaction_type, setTransactionType ]= useState(0);
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription ]= useState("");

    const [componentSize, setComponentSize] = useState('large');

    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

      useEffect(() => {
        axios.get(baseUrl+"accounts")
        .then(res => {
            console.log(res.data.accounts)
           setAccounts(res.data.accounts)
        })
        .catch(e=>console.log("sommmsms"))
      }, [])

      useEffect(() => {
        let id = params.id
        axios.get(baseUrl+"transactions/"+id,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(res => {
            //console.log("next",res.data)
         
            setCreditAccountId(res.data.credit_account_id)
            setDebitAccountId(res.data.debit_account_id)
            setCreditAccountName(res.data.debit_account_name)

            setTransactionType(0)
            setDate(res.data.date)
            setAmount(res.data.amount)
            setDescription(res.data.narration)
 
        })
        .catch(e=>console.log("sommmsms"))
      }, [])





    const handleDate = (date, dateString) => {
        setDate(dateString);
      };

      const handleCreditAccount = (e) => {
       
            setCreditAccountId(e);
       
      };

      const handleDebitAccount = (e) => {
       
            setDebitAccountId(e);
    
      };

      const handleTransactionType = (value) => {
        setTransactionType(value)
      };

      const handleAmount = (e) => {
       
        if(e < 0 || e==null){
          setAmount(0);
          return
        }else{
          setAmount(e);
        }
      };


      

      const handleDescription = (e) => {
        
         setDescription(e.target.value)
      };

    function submitForm (event) {
     //  event.preventDefault();
    //   let id = params.id
      const data = {date:date,credit_account_id:credit_account_id,debit_account_id:debit_account_id,transaction_type:transaction_type,amount:amount,narration:description}
  // console.log(data)
  // return
      axios.post(baseUrl+"credit",data)
      .then(res =>{
        form.resetFields();
        setCreditAccountId(0)
        setDebitAccountId(0)
        setTransactionType(0)
        setDate("")
        setAmount(0)
        setDescription("")
        
        
         Swal.fire(
            'Success!',
             'Successfully added!',
            'success'
           )

           history.push("/app/employee/transactions")
      
      })


    }


      return (         
      <div className="page-wrapper">
      <div className="content container-fluid">

        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Transaction</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/employee/transactions">All Transaction</Link></li>
                <li className="breadcrumb-item active">Edit </li>
              </ul>
            </div>
        
          </div>
        </div>
     
    
  
    {/* <Row gutter={16}>
      <Col span={16}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col> */}

    {/* </Row> */}
    <Card title="Transaction" bordered={false}>
      
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "large",
      }}
    
      size={"large"}
      onFinish={submitForm}
    >
       <Form.Item label="Debit Account">
       <Select style={{ width: '100%'}}  onChange={handleCreditAccount} size='large' className='select-container' showSearch placeholder='From' optionFilterProp='children' filterOption={(input, option) => option?.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {accounts?.map((account) => (
                    <Option key={account.id}value={account.id}>
                     {account.account_Name}
                    </Option>
                  ))}   
                </Select>

      </Form.Item>

      <Form.Item label="Credit Account">
       <Select style={{ width: '100%'}}  onChange={handleDebitAccount} size='large' className='select-container' showSearch placeholder='To' optionFilterProp='children' filterOption={(input, option) => option?.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option key={debit_account_id}value={debit_account_id}>
                     {debit_account_name}
                    </Option>
                  {accounts?.map((account) => (
                    <Option key={account.id}value={account.id}>
                     {account.account_Name}
                    </Option>
                  ))}   
                </Select>

      </Form.Item>

      <Form.Item label="Transaction Type">
      <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={handleTransactionType}
 //   onSearch={onSearch}
    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
  >
    <Option value="1">Advance</Option>
    <Option value="2">Refund</Option>
    <Option value="3">Payment</Option>
    <Option value="4">Adjustment</Option>
  </Select>
      </Form.Item>


      <Form.Item label="Date">
        <DatePicker onChange={handleDate} defaultValue={date} />
      </Form.Item>
   
      <Form.Item label="Amount" >

        <InputNumber prefix="$" onChange={handleAmount} value={amount}  />
      </Form.Item>

      <Form.Item name='description' label="Description">
        <Input.TextArea onChange={handleDescription} defaultValue={description} />
      </Form.Item>

       <Form.Item style={{paddingLeft:'265px'}}>
        <Button  className="btn btn-primary" htmlType="submit">Submit</Button>

      </Form.Item>
      </Form>
        </Card>


      </div>


    </div>
        );
}

export default EditTransaction;
