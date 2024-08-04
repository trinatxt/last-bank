import React from 'react'

const rooms = () => {
  return (
    <div className='max-w-[1400px] h-[500px] bg-blue-100 mx-auto my-20 pt-16 lg:mb-[20%] md:mb-[35%] px-4 grid lg:grid-cols-3 gap-4'>
      <div className='lg:top-20 relative lg:col-span-1 col-span-2'>
        <h3 className='text-2xl font-bold'>Fine Interior Rooms</h3>
        <p className='pt-4'>
            bjwksf
        </p>
      </div>

      <div className='grid grid-cols-2 col-span-2 gap-2'>
        <img className='object-cover w-full h-full' src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*Rpepkt7auY2OUDL5.jpg" alt="" />
        <img className='row-span-2 object-cover w-full h-full' src="https://www.hepper.com/wp-content/uploads/2023/04/Single-spotted-Holland-Lop-rabbit.webp" alt="" />
        <img className='object-cover w-full h-full' src="https://st.depositphotos.com/1681595/1280/i/950/depositphotos_12802899-stock-photo-rabbit.jpg" alt="" />
      </div>
    </div>
  )
}

export default rooms;
