import Image from 'next/image'
import styles from './preloader.module.css'

const Preloader = () => { 
  return <div className={styles.preloaderWrapper}>
    <Image src='/isFetching.svg' alt='fetching' width='200px' height='200px' />
  </div>
};

export default Preloader;