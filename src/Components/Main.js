import React from 'react'

import { useEffect, useState } from 'react';


import io from 'socket.io-client';
import LineComp from './LineComp';
import BarComp from './BarComp';
import Download from './Download';
const socket = io.connect('https://real-time-graph-backend.vercel.app/')


function Main() {


    const [sale, setSale] = useState()
    const [date, setDate] = useState()
    const [selectedGraph, setSelectedGraph] = useState('Line')
    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

    const [dataValue, setDataValue] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sales V/S Date',
                data: [],
                borderColor: 'rgb(247, 109, 1)',
                backgroundColor: 'rgba(247, 109, 1,1)',
                fill: false,
                // cubicInterpolationMode: 'monotone',
                pointRadius: 0,
                
            },
            

        ],


    })

    const sendMessage = async () => {
        socket.emit('send_message', { value: sale, time: new Date(date).getTime() })

        await fetch('https://real-time-graph-backend.vercel.app/addData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: sale, time: new Date(date).getTime() }),
        })

        getData();

    }

    const getData = async () => {
        let res = await fetch('https://real-time-graph-backend.vercel.app/getData')
        res = await res.json()

        await res.data.sort((a, b) => { return a.time - b.time })
        let dataArr = res.data.map((elem) => elem.value)
        let labelArr = res.data.map((elem) => elem.time)

        labelArr = res.data.map((elem) => ` ${(months[new Date(elem.time).getMonth()]).substring(0,3)} ${new Date(elem.time).getDate()}, ${new Date(elem.time).getFullYear()}`)

        console.log(labelArr)
        setDataValue(
            {
                labels: labelArr,
                datasets: [
                    {
                        label: 'Sales V/S Date',
                        data: dataArr,
                        borderColor: 'rgb(247, 109, 1)',
                        backgroundColor: 'rgba(247, 109, 1,1)',
                        fill: false,
                        // cubicInterpolationMode: 'monotone',
                        pointRadius: 0,
                        tension:0.3
                    },

                ],
            }
        )
    }

    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        socket.on('recieve_message', (socketData) => {
            getData();
        })
    }, [socket])




    return (
        <div id='pageContainer'>
            <div id='menu'>
                <select value={selectedGraph} onChange={(event) => setSelectedGraph(event.target.value)}>
                    <option value='Line'>Line Graph</option>
                    <option value='Bar'>Bar Graph</option>
                </select>
            </div>

            <div className="main" >

                {selectedGraph == 'Line' ? <LineComp data={dataValue} /> :
                    <BarComp data={dataValue} />}

                <div id='form'>
                    <div className='inputContainer'>
                        <label>Sales</label><br/>
                        <input type='number' value={sale} onChange={(event) => { setSale(event.target.value) }}></input><br />
                    </div>
                    <div className='inputContainer'>
                        <label>Date of Sale</label><br/>
                        <input type='date' value={date} onChange={(event) => { setDate(event.target.value) }}></input><br />
                    </div>
                    <div id='buttonContainer'>
                    <button onClick={sendMessage}> SEND </button>
                    <Download data={dataValue} />
                    </div>
                    
                </div>
            </div>




        </div>
    )
}

export default Main
