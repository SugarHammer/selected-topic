import React, {Component} from 'react';
// 引入 ECharts 主模块
// import echarts from 'echarts/lib/echarts';
import * as echarts from "echarts"
import axios from "axios";
import './topic.css'


class Topic extends Component {

    constructor(props) {
        super(props);

        this.getDate = this.getDate.bind(this);
    }


    componentDidMount() {
        this.getDate();

    }
    getDate(){
        axios({
            method:'post',
            url:"http://localhost:8088/topics/getData",
        })
            .then((res) => {
                console.log(res);
                console.log(res.data.PHP);
                console.log("44");
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('dd'));
                var zx = echarts.init(document.getElementById('zx'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '技术使用情况统计' },
                    tooltip: {},
                    xAxis: {
                        data: ["Hadoop", "PHP", "SpringMVC", "SpringBoot", "Android"]
                    },
                    yAxis: {},
                    series: [{
                        name: '使用量',
                        type: 'bar',
                        data: [res.data.Hadoop, res.data.PHP, res.data.SpringMVC, res.data.SpringBoot, res.data.Android]
                    }]
                });
                zx.setOption({
                    xAxis: {
                        type: 'category',
                        data: ["Hadoop", "PHP", "SpringMVC", "SpringBoot", "Android"]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [res.data.Hadoop, res.data.PHP, res.data.SpringMVC, res.data.SpringBoot, res.data.Android],
                            type: 'line'
                        }
                    ]
                })
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }
    render() {
        return (
            <div>
                <span id="dd" style={{ width: 600, height: 400 }}  className="div1"></span>
                <span id="zx" style={{ width: 600, height: 400 }} className="div1"></span>
                <div>
                    <a href='http://localhost:63342/ciyun/ciyun.html?_ijt=i57lt4uaaa70vcrm4n8l80bgt5' >查看词云</a>
                </div>
            </div>
        );
    }
}

export default Topic;