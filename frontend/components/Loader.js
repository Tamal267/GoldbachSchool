import Image from 'next/image'
import loaderGif from '../public/Assets/Loader.gif'

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Image
        src={loaderGif}
        alt="loading"
        width={100}
        height={100}
      />
    </div>
  )
}

export default Loader
