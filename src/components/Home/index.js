import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-t.png'
import Logo from '.././Home//FloatingVertSlider//Logo.tsx'
import './index.scss'
import { transform } from 'typescript'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = ['a', 'y', 'l', 'o', 'r']
  const jobArray = [
    'F',
    'u',
    'l',
    'l',
    '-',
    'S',
    't',
    'a',
    'c',
    'k',
    ' ',
    'D',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r',
  ]

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldDisplayLogo = windowWidth >= 1200; 

  return (
    <>
      <div className="container-fluid home-page h-screen flex w-screen" style={{ justifyContent: 'space-evenly' }}>
  <div className="md:w-100 lg:w-1/3">
    <div className="text-zone w-100">
      <h1>
        <span className={letterClass}>H</span>
        <span className={`${letterClass} text-4xl md:text-5xl lg:text-6xl`}>i,</span>
        <br />
        <span className={`${letterClass} text-8xl`}>I</span>
        <span className={`${letterClass} text-8xl`}>m</span>
        <div style={{ display: 'inline-flex',  transform: 'translateY(23px)', }}>
          <div className="min-w-0">
            <img
              style={{
                width: `80px`,
                filter: `grayscale(1) invert(1)`,
                position: `inherit`,
                filter: 'grayscale(1) invert(1)',
               
              }}
              src={LogoTitle}
              alt="JavaScript Developer Name, Web Developer Name"
              className="logo-image"
            />
          </div>
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'row',
              transform: 'translateY(17px) translateX(-16px)'
            }}
          >
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
          </div>
        </div>
        <br />
        <AnimatedLetters
          letterClass={letterClass}
          strArray={jobArray}
          idx={16}
        />
      </h1>

      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mt-4">Full Stack Developer / JavaScript/React/.Net/SQL </h2>
      <Link
        to="/contact"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4 inline-block transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      >
        CONTACT ME
      </Link>
    </div>
  </div>
  {shouldDisplayLogo && (
    <div className="w-2/3 sm:w-1/2 flex items-center justify-center mt-8">
      <div className="w-full lg:w-1/2">
        <Logo />
      </div>
    </div>
  )}
</div>


      <Loader type="line-scale-pulse-out" />
      
    </>
  )
}

export default Home
