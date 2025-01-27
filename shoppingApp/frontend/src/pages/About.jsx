import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nisi impedit modi ipsam similique. Perferendis tempora quidem repudiandae, accusantium dignissimos autem dolores fugit natus ex deleniti suscipit at nihil et.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quam vitae dolorum aut incidunt hic! Cum magni deserunt ea laborum doloribus impedit explicabo quibusdam! Laboriosam explicabo consectetur incidunt totam doloremque.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quidem error voluptatem. Corporis, architecto! Aliquam modi incidunt accusantium dolorem molestias magnam debitis ducimus dolores! Facilis ducimus voluptas suscipit earum eum?</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis soluta molestias assumenda sint vitae cumque. Exercitationem illo dolor temporibus quas doloremque esse consequatur excepturi impedit optio amet. Maiores, quasi sint.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis soluta molestias assumenda sint vitae cumque. Exercitationem illo dolor temporibus quas doloremque esse consequatur excepturi impedit optio amet. Maiores, quasi sint.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis soluta molestias assumenda sint vitae cumque. Exercitationem illo dolor temporibus quas doloremque esse consequatur excepturi impedit optio amet. Maiores, quasi sint.</p>
        </div>
      </div>

      <NewsletterBox/>

    </>
  )
}

export default About