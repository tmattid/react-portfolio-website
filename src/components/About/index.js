import { useEffect, useState } from 'react'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <div className="container mx-auto about-page h-screen flex flex-col md:flex-row items-center " style={{ marginLeft: '100px' }}>
    <div className="w-full md:w-1/3">
      <div className="text-zone mt-4">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
            idx={15}
          />
        </h1>
        <p className="text-justify">
          I'm very ambitious full-stack developer looking for a role in established IT company with the opportunity to work with the latest technologies on challenging and diverse projects.
        </p>
  
        <p className="text-justify">
          I'm quietly confident, naturally curious, and perpetually working on improving my chops one design problem at a time.
        </p>
        <br />
        <p className="text-justify">
          If I need to define myself in one sentence that would be "committed professional", always moving to learn more and build excellent products that will improve peoples lives.
        </p>
      </div>
    </div>
    <div className="w-full md:w-2/3 flex justify-center">
      <div className="stage-cube-cont">
        <div className="cubespinner">
          <div className="face1">
            <FontAwesomeIcon icon={faAngular} className="text-red-600" />
          </div>
          <div className="face2">
            <FontAwesomeIcon icon={faHtml5} className="text-yellow-500" />
          </div>
          <div className="face3">
            <FontAwesomeIcon icon={faCss3} className="text-blue-500" />
          </div>
          <div className="face4">
            <FontAwesomeIcon icon={faReact} className="text-blue-300" />
          </div>
          <div className="face5">
            <FontAwesomeIcon icon={faJsSquare} className="text-yellow-300" />
          </div>
          <div className="face6">
            <FontAwesomeIcon icon={faGitAlt} className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
    <Loader type="line-scale-pulse-out" className="mt-auto" />
  </div>
  )  
}

export default About
