import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useEffect, useState} from "react";
import {createArticleAPI, getChannelAPI} from "@/apis/article";


const { Option } = Select

const Publish = () => {

    // 取出序列数据 渲染
    const [channels, setChannels] = useState([])
    useEffect(()=>{
        async function fetchChannels (){
            const res = await getChannelAPI()
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, []);

    // 表单提交
    const onFinish = (formData)=>{
        console.log(formData)
        const {title, content, channel_id} = formData
        const data = {
            title,
            content,
            cover:{
                type:0,
                images:[]
            },
            channel_id
        }
        createArticleAPI(data)
    }

    //
    const [imgList, setImgList] = useState([])
    const onUploadChange = (info)=>{
        console.log(info)
        setImgList(info.fileList)
    }
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1   }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channels.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                    {/*图片上传*/}
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
                            listType 决定选择框的外表样式
                            showUploadList 控制显示上传列表
                            action 上传接口路径
                            name 接口内所对应的属性
                            onChange 拿到图片数据 存储到react中
                        */}
                        <Upload
                            listType="picture-card"
                            showUploadList
                            action="http://geek.itheima.net/v1_0/upload"
                            name="image"
                            onChange={onUploadChange}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        {/*富文本编辑器*/}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish