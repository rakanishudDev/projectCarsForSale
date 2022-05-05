import React from 'react'

const about = () => {
  return (
    <div style={{margin: "3rem"}}>
        <br/>
        
        <div>
          <p> Web Technologies:</p>
          <ul>
              <li>Next.js</li>
              <li>React.js</li>
              <li>Firebase</li>
          </ul>
          <p>Dependencies:</p>
          <ul>
              <li>react-toastify</li>
              <li>swiper</li>
              <li>uuid</li>
          </ul>
          <p>Github repo:</p>
          <ul>
              <li><a className="githubRepo" href="https://github.com/rakanishudDev/projectCarsForSale">https://github.com/rakanishudDev/projectCarsForSale</a></li>

          </ul>
        </div>
        <style>
          {
            `
            .githubRepo {
              color: blue;
            }

            `
          }
        </style>
    </div>
  )
}

export default about