import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_ksnse0a',
        'template_wcks7oi',
        form.current,
        'MDfOJQURLmICCPaFX'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="container contact-page p-0">
        <div className="flex flex-wrap w-full">
            <div className="w-full md:w-1/2 h-screen pr-4 flex items-center">
            <div className="text-zone">
              <h1>
                <AnimatedLetters
                  letterClass={letterClass}
                  strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                  idx={15}
                />
              </h1>
              <p>
                I am interested in freelance opportunities - especially ambitious
                or large projects. However, if you have another request or
                question, don't hesitate to contact me using the form below.
              </p>
              <div className="contact-form">
                <form ref={form} onSubmit={sendEmail}>
                  <ul className="flex flex-wrap">
                    <li className="w-full md:w-1/2 px-2 mb-4">
                      <input
                        placeholder="Name"
                        type="text"
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </li>
                    <li className="w-full md:w-1/2 px-2 mb-4">
                      <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </li>
                    <li className="w-full px-2 mb-4">
                      <input
                        placeholder="Subject"
                        type="text"
                        name="subject"
                        required
                        className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </li>
                    <li className="w-full px-2 mb-4">
                      <textarea
                        placeholder="Message"
                        name="message"
                        required
                        className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                    </li>
                    <li className="w-full px-2 mb-4">
                      <input
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        value="SEND"
                      />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
            <div className="w-full md:w-1/2  ">
            <div className="info-map">
              Taylor Mattison,
              <br />
              Orange County, California
              <br />
              <br />
              <span>Email: tmattid@gmail.com</span>
            </div>

            <div className="map-wrap ">
              <MapContainer
                center={[33.892047, -117.886026]}
                zoom={13}
                className=""
              >
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                  
                />
                <Marker position={[44.96366, 19.61045]}>
                  <Popup>
                    Taylor lives here, come over for a cup of coffee :)
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <Loader type="line-scale-pulse-out" />
    </>
  )
}

export default Contact
