import landingImage from '../assets/landing.png'
import appDownloadImage from '../assets/appDownload.png'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-4 py-8 text-center rounded-lg shadow-sm bg-card'>
        <h1 className='text-4xl'>Tuck into the delicious</h1>
        <span className='text-lg text-muted-foreground'>A place where you can find your favorite food</span>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <img src={landingImage} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='text-2xl '>Order takeaway even faster!</span>
          <span className='text-muted-foreground'>
            Download app for faster ordering and personalized recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
