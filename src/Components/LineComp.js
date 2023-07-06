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
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import Hammer from "hammerjs";

import zoom from 'chartjs-plugin-zoom'
import { useRef } from 'react';




function LineComp({ data }) {

  const chartRef = useRef(null);

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

  ChartJS.defaults.color = "#f76d01";
  ChartJS.defaults.backdropColor = "#f76d01";
  ChartJS.defaults.color = "#f76d01";

  // let draw = ChartJS.controllers.line.prototype.draw;
  // ChartJS.controllers.line = ChartJS.controllers.line.extend({
  //   draw: function () {
  //     draw.apply(this, arguments);
  //     let ctx = this.ChartJS.ChartJS.ctx;
  //     let _stroke = ctx.stroke;
  //     ctx.stroke = function () {
  //       ctx.save();
  //       ctx.shadowColor = '#E56590';
  //       ctx.shadowBlur = 10;
  //       ctx.shadowOffsetX = 0;
  //       ctx.shadowOffsetY = 4;
  //       _stroke.apply(this, arguments)
  //       ctx.restore();
  //     }
  //   }
  // });

    useEffect(()=>{
      ChartJS.register({
        id: 'customShadow',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
  
          const originalLineDraw = ctx.stroke;
          ctx.stroke = function () {
            ctx.save();
            ctx.shadowColor = 'rgba(247, 109, 1, 0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            originalLineDraw.apply(this, arguments);
            ctx.restore();
          };
        }
      });
    },[])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
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
    scales: {
      x: {
        grid: {
          display: false
        }
      }
    }

  };

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };


  return (
    <div className='graph'>
      <Line ref={chartRef} options={options} data={data} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handleResetZoom}>RESET </button>
      </div>
    </div>
  )
}

export default LineComp