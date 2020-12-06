import { Provider } from 'react-redux'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import store from '../redux/reduxStore'
import './app.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <div className='container'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  )
}

export default MyApp
