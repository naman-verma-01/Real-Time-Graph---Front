import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarElement,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import Hammer from "hammerjs";

import zoom from 'chartjs-plugin-zoom'
import { useRef } from 'react';


function BarComp({ data }) {

    const chartRef2 = useRef(null);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        zoom
    );

    // useEffect(()=>{
    //     ChartJS.register({
    //       id: 'customShadow',
    //       beforeDraw: (chart) => {
    //         const ctx = chart.ctx;
    //         ctx.save();

    //         const originalLineDraw = ctx.stroke;
    //         ctx.stroke = function () {
    //           ctx.save();
    //           ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    //           ctx.shadowBlur = 10;
    //           ctx.shadowOffsetX = 10;
    //           ctx.shadowOffsetY = 10;
    //           originalLineDraw.apply(this, arguments);
    //           ctx.restore();
    //         };
    //       }
    //     });
    //   },[])


    const shadowPlugin = [{
        id: 'shadow',
        beforeDraw: (chart) => {
            const { ctx } = chart;
            const _fill = ctx.fill;
            ctx.fill = function () {
                ctx.save();
                ctx.shadowColor = 'rgba(247, 109, 1, 0.5)';
                //ctx.shadowColor = 'rgba(12,77, 229, 0.2)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 7;
                ctx.shadowOffsetY = 10;
                _fill.apply(this, arguments);
                ctx.restore();
            };
        },
    }];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'BAR CHART',
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                }
            }

        },

    };
    const handleResetZoom2 = () => {
        if (chartRef2 && chartRef2.current) {
            chartRef2.current.resetZoom();
        }
    };


    return (
        <div className='graph'>
            <div className='graph-container'>

                <Bar ref={chartRef2} options={options} data={data} plugins={shadowPlugin} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={handleResetZoom2}>RESET </button>
            </div>
        </div>
    )
}

export default BarComp