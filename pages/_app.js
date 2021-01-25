import Head from 'next/head'
import { Provider } from 'react-redux'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import store from '../redux/reduxStore'
import './app.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Green Penguin</title>
        <link rel="shortcut icon" href="/static/favicon.svg" />
      </Head>
      <div className='container'>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  )
}

export default MyApp