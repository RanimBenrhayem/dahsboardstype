import React, {useEffect, useState,Component} from "react";
import { useCallback, useRef } from "react";
import {downloadFiles, getUserSimpleFiles} from "../../services/axios";
import Swal from "sweetalert2";
import 'chart.js/auto'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Bubble, Line ,Pie, Radar,Doughnut,Scatter, PolarArea} from 'react-chartjs-2';
import axios from "axios";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { LineChart } from "recharts";




ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);







const Charts =   ()=> {
    const [fileToDraw , setFileToDraw] = useState("")
    const [headers1, setHeaders1] = useState("");
    const [files, setFiles] = useState([])
    const [fileData,setFileData] = useState([]) ;
    const [attribut1, setAttribut1] = useState("");
    const [attribut2, setAttribut2] = useState("");
    const [graph,setGraph] = useState({}) ;
    const [show,setShow] = useState(false);
    const[showAlert,setShowAlert] = useState(true)
    const ref = useRef(null);
    function getHeadersFromCsv(data) {
        return data.slice(0, data.indexOf("\n")).split(",");
    }
    useEffect(() => {
        async function fecthUserSimpleFiles() {
            const response = await getUserSimpleFiles(); //getuserSimpleFiles est definie dans axios.js
            if (response.success === true) {

                setFiles(response.data);
                console.log(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.data,
                    showCancelButton: false,

                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }

        fecthUserSimpleFiles();
    }, []);
    async function handleFileOptions(e) {
        console.log(e.target.value);
        setFileToDraw(e.target.value);
        if (e.target.value !== "") {
            const response = await downloadFiles(e.target.value);
            if (response.success === true) {
                setHeaders1(getHeadersFromCsv(response.data));
                setFileData(response.data)
            }
        }
    }
    const handleProcess = async ()=> {
        try{
            if (fileToDraw.length > 0) {
                setFileData([]);
               
                const response =await axios({
                    method :"post",
                    url : `http://localhost:8080/chart/draw/${fileToDraw}`,
                    data : {xaxis:attribut1 , yaxis : attribut2}
                })
const {xaxis,yaxis,labels,returnedData} = response.data
                console.log(response.data)
                const values = returnedData.map((element)=>parseFloat(element))
                console.log(labels)
                console.log(values)
                setGraph({
                    labels,
                    datasets: [
                        {
                            label: `${yaxis} = fn(${xaxis})`,
                            data: values,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(60, 179, 113)',
                                'rgb(255, 205, 86)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 255, 0)',
                               
                               
                                 
                              ],
                              hoverOffset: 8

                        },
                      


                    ],
                })
            }
            
            setShow(true)
            
        }catch (e) {
            console.log(e)
        }
    }

    const saveInfoDashboard = async ()=> {
        try {
            

            if (fileToDraw.length > 0) {
                setFileData([]);
                const response =await axios({
                    method :"post",
                    url : `http://localhost:8080/chart/save/database`,
                    data : {xaxis:attribut1 , yaxis : attribut2,fileToDraw : `${fileToDraw}`}
                })}







        } catch (error) {
            
        }
    }
    const downloadImage = useCallback (()=>{
        const link = document.createElement('a');
        link.download = 'chart.png'
        link.href = ref.current.toBase64Image()
        link.click();
    },[])
        




/******************* chart js options ***********************/


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your  Chart',
        },
    },
};
  const [chart, setChart] = React.useState();

  function Chart(e) {
    if (e.value === "bar") {
      return (
        <div style={{height : '720px' , width : '750px',marginLeft : '-70px',marginTop:'-20px'}}>
          
          {show && <Bar  ref={ref} options={options} data={graph} />}
        </div>
      );
    } else if (e.value === "pie") {
      return (
        <div style={{height : '450px' , width : '450px',marginLeft : '20px',marginTop:'-70px'}}>
          {show && <Pie ref={ref} options={options} data={graph}  />}
        </div>
      );
    } else if (e.value === "bubble") {
      return (
        <div style={{height : '620px' , width : '650px',marginLeft : '-70px',marginTop:'-20px'}}>
          {show && (
            <Bubble ref={ref} options={options} data={graph}  />
          )}
          
        </div>
      );
    } else if (e.value === "polararea") {
        return (
          <div style={{height : '450px' , width : '450px',marginLeft : '20px',marginTop:'-70px'}}>
            {show && (
              <PolarArea ref={ref} options={options} data={graph}  />
            )}
    </div>
        )
    
  }}

  return (
    <React.Fragment>
      <div style={{ marginTop: -200, marginLeft: -300 }}>
        <select value={fileToDraw} onChange={handleFileOptions} className="select1">
          <option value={""}>__please choose a file__</option>
          {files.map((element) => {
            return (
              <option value={element._id}>
                {element.metadata.originalFileName}
              </option>
            );
          })}
        </select>
        <div >
          {headers1.length > 0 && (
            <select className="select2"
              value={attribut1}
              onChange={(e) => setAttribut1(e.target.value)}
            >
              <option value={""}>_please select an attribut_</option>
              {headers1.map((element, index) => {
                let subElt = element.substring(2, element.length - 2);
                if (index === 0) {
                  subElt = subElt.substring(1);
                } else if (index === headers1.length - 1) {
                  subElt = subElt.substring(0, subElt.length - 2);
                }

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}
        </div>
        <div >
          {headers1.length > 0 && (
            <select className="select3"
              value={attribut2}
              onChange={(e) => setAttribut2(e.target.value)}
            >
              <option value={""}>_please select an attribut_</option>
              {headers1.map((element, index) => {
                let subElt = element.substring(2, element.length - 2);
                if (index === 0) {
                  subElt = subElt.substring(1);
                } else if (index === headers1.length - 1) {
                  subElt = subElt.substring(0, subElt.length - 2);
                }

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}
            {headers1.length > 0 && (
                <>
          <button className="buttonShow" onClick={handleProcess} >
           View
          </button>
           <button className="buttonShow" onClick={handleProcess}>
           Save
          </button>
          <button  className="buttondownloadasimage" onClick={downloadImage}>download as image</button>
          </> )}
        </div>
        <div>
          {headers1.length > 0 && (
            <>
              <select 
               className="select4"
                defaultValue="Select Chart"
                onChange={(e) => setChart(e.target.value)}
              >
                   <option value="type">choose type of chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">pie Chart</option>
                <option value="bubble">Bubble Chart</option>
                <option value="polararea">PolarArea Chart</option>
              </select>

              <h1 className="selectechart">Selected Chart: {chart}</h1>
              <Chart  value={chart} />
            </>
          )}
        </div>
      </div>
      {/* <div 
      style={{height : '400px' , width : '400px',marginLeft : '450px',marginTop:'100px'}}>
        {show && <Pie options={options} data={graph}  />}
      </div> */}
    </React.Fragment>
  );
};

export default Charts;