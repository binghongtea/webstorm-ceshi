import {useEffect, useRef} from "react";
import * as echarts from "echarts";

const BarChart = ({title,xData})=>{
    const chatRef = useRef(null)
    useEffect(() => {
        // 获取DOM结点
        const chartDom = chatRef.current;
        // 图表初始化 生成图表实例对象
        const myChart = echarts.init(chartDom);
        // 准备图表参数
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10,80,50],
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }, []);
    return <div><div ref={chatRef} style={{width: '500px' ,height : '400px'}}></div></div>
}

export default BarChart