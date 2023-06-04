import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-t.png'
import './index.scss'

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

  return (
    <>
      <div className="container-fluid home-page h-100">
        <div className="col">
          <div className="text-zone">
            <h1>
              <span className={letterClass}>H</span>
              <span className={`${letterClass} _12`}>i,</span>
              <br />
              <span className={`${letterClass} _13`}>I</span>
              <span className={`${letterClass} _14`}>'m</span>
              <div style={{ display: 'inline-flex' }}>
                <img
                  style={{
                    width: `80px`,
                    filter: `grayscale(1) invert(1)`,
                    position: `fixed`,
                    top: `36px`,
                    left: `45px`,
                    filter: 'grayscale(1) invert(1)',
                  }}
                  src={LogoTitle}
                  alt="JavaScript Developer Name, Web Developer Name"
                  className="logo-image"
                />
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    marginLeft: `75px`,
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

            <h2>Full Stack Developer / JavaScript/React/.Net/SQL </h2>
            <Link to="/contact" className="flat-button">
              CONTACT ME
            </Link>
          </div>
        </div>
     
        
      </div>

      <Loader type="line-scale-pulse-out" />
      
    </>
  )
}

export default Home
