import Image from 'next/image'
import classes from './preloader.module.css'

const Preloader = () => { 
  return <div className={classes.preloaderWrapper}>
    <Image src='/isFetching.svg' alt='fetching' width='200px' height='200px' />
  </div>
};

export default Preloader;