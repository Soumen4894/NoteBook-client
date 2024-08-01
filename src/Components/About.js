import React from 'react'
import { Icon } from '@iconify/react';


const About = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
    <div className='container'>
      <h1 className='about' >About Me</h1>
      <div className='container mx-5 my-4'><h2 className='head'>Software Developer</h2>
        <h4 className=' font-normal text-secondary mb-4 leading-relaxed'>Hello, Welcome to my Note-book. I'm Soumen Mandal, a MERN stack developer. I create this google keep clone application using MERN stack.</h4>
        <div className='d-flex'>
          <h3 className='my-4 head'>Contact me:</h3>
          <a className="ancor" href="https://www.linkedin.com/in/soumen-mandal-sm4894"><Icon icon="mdi:linkedin" color="#64748b" width="40" height="40" /></a>
          <a className="ancor" href="https://github.com/Soumen4894"><Icon icon="mdi:github" color="#64748b" width="40" height="40" /></a>
          
        </div>
        <div className='d-flex'>
          <h3 className='my-4 head'>Coding Platform:</h3>
          <a className="ancor" href="https://auth.geeksforgeeks.org/user/soumenmandal4894/?utm_source=geeksforgeeks&utm_medium=my_profile&utm_campaign=auth_user"><Icon icon="simple-icons:geeksforgeeks" color="#64748b" width="40" height="40" /></a>
          <a className="ancor" href="https://leetcode.com/soumen123/"><Icon icon="tabler:brand-leetcode" color="#64748b" width="40" height="40" /></a>
        </div>
      </div>
    </div>
    <footer className='foot text-secondary'>
        <p>Copyright Ⓒ {currentYear}</p>
    </footer>
    </>  
  )
}

export default About