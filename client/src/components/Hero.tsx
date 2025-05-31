import hero from '../assets/hero.png'

const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        className='w-[1344px] object-cover mx-auto my-8'
      />
    </div>
  )
}

export default Hero
