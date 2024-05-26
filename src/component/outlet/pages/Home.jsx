// in page home -> we show the chart

import React, { useContext, useEffect, useState } from 'react'
import { Chart, defaults } from 'chart.js/auto'
import { Bar, Line, Doughnut } from "react-chartjs-2"
import { clientContext } from "../../../helper/ClientContext"


// const url = "http://localhost:3000/client";

// defaults -  global
// its adjust its self according to div size if you make it false
defaults.maintainAspectRatio = false

// automatically resize to fit its container when the size of the container changes.
// remains visually appealing and readable across different screen sizes and devices.
// dynamically adjusts its width and height based on the dimensions of its parent container.
defaults.responsive = true

// for title adjustment 
// make a room for the tile 
defaults.plugins.title.display = true

// the title font size
defaults.plugins.title.font.size = 20



export default function Home() {

  // const { allClients } = useContext(clientContext)
  // const [arrData, setArrData] = useState("")
  // console.log(allClients)
  // if (allClients) {
  //   console.log("home:", allClients[0].createdAt)

  //   // make array of date from users create at  and sort it 
  //   const arrDateClient = allClients.map((val, index) => {
  //     return val.createdAt.split("T")[0]
  //   })
  //   console.log("Array withe date only:", arrDateClient)

  //   // now i have array of date i need to get count of user for each date
  //   const dateCount = arrDateClient.reduce((acc, val) => {
  //     if (acc[val]) {
  //       acc[val]++;
  //     } else {
  //       acc[val] = 1;
  //     }
  //     return acc;
  //   }, {});

  //   console.log(dateCount);

  //   setArrData(dateCount)
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className='text-xl text-blue-600 '>Statistics</h1>
      <div className="w-[94%] h-[35vh] bg-white border border-blue-500 mb-10">
        {/* insert it a component of chart */}
        {/* new user pear weak */}
        <Bar
          data={{
            // the x info
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            // labels: Object.keys(arrData),
            // the y info
            datasets: [{
              label: "New User per day",
              // the real date need to get it from server /api
              data: [1, 5, 10, 15, 3, 2, 7]
              // data: Object.values(arrData)
            },
              // using 2 bar :      to make  bar in  inside a bar 
              // {
              //   label: "Last weak",
              //   data: [2,6,7,5,10,6,8]
              // }


            ]
           

          }}
          options={{
            plugins: {
              title: {
                text: "New user"
              }
            },
          }}
        />

      </div>

      <div className="flex justify-between w-full px-10">
        {/* <h1 className='text-xl text-blue-600 '>Order</h1> */}
        <div className="w-[45%] h-[35vh] bg-white border border-blue-500">

          {/* insert it a component of chart */}
          <Doughnut
            data={{
              labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              // the y info
              datasets: [{
                label: "Order per day",
                data: [700, 1500, 200, 450, 11750, 6500, 2152]
              }]
            }}
          />

        </div>
        <div className="w-[45%] h-[35vh] bg-white border border-blue-500">
          {/* insert it a component of chart */}
          <Line
            data={{
              labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              // the y info
              datasets: [{
                label: "Order per day",
                data: [8, 5, 12, 2, 7, 1, 9]
              }]
            }}
            // to add title
            options={{
              elements: {
                line: {
                  // change the line lock 
                  tension: 0.5
                }
              },
              plugins: {
                // set the text of the title
                title: {
                  text: "Weakly sell"
                }
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
