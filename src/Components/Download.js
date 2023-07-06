import React from 'react'

function Download({data}) {

    function convertToCSV(data) {
        const header = ['SALES','DATE'].join(',')+'\n'
        const rows = data.datasets[0].data.map((elem,index)=> elem + ',' + data.labels[index].split(',').join(' ')).join('\n');
        return header + rows;
      }



      function downloadCSV(csvContent, fileName) {
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', `data:text/csv;charset=utf-8,${encodedUri}`);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const downloadHandler = async()=>{
        const csvString = convertToCSV(data);
      
        downloadCSV(csvString, 'data.csv');
      }

    
  return (
    <div>
        <button  onClick={downloadHandler}>Download</button>
    </div>
  )
}

export default Download