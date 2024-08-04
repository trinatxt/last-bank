import React, {useState} from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const ImageSlider = () => {
    const slides = [
        {
            url: 'https://miro.medium.com/v2/resize:fit:828/format:webp/0*Rpepkt7auY2OUDL5.jpg',
            title: 'rabbit 1',
        },
        {
            url: 'https://www.hepper.com/wp-content/uploads/2023/04/Single-spotted-Holland-Lop-rabbit.webp',
            title: 'rabbit 2',
        },
        {
            url: 'https://st.depositphotos.com/1681595/1280/i/950/depositphotos_12802899-stock-photo-rabbit.jpg',
            title: 'rabbit 3',
        },
        {
            url: 'http://www.starshollowrabbitry.com/uploads/1/3/3/5/133513603/published/219910271.JPG?1625276323',
            title: 'rabbit 4'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    };

    return (
        <div className='max-w-[1400px] h-[580px] w-full m-auto py-16 px-4 relative group'>
            <div 
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            ></div>
            {/* Left Arrow */}
            <div 
                className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2
                group-hover:bg-black/20 text-white cursor-pointer'
                // onClick={prevSlide}
            >
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div 
                className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2
                group-hover:bg-black/20 text-white cursor-pointer'
            >
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            {/* dots */}
                <div className='flex top-4 justify-center py-2'>
                    {slides.map((slide, slideIndex) => (
                        <div 
                            className='text-2xl cursor-pointer' 
                            key={slideIndex} 
                            onClick={() => goToSlide(slideIndex)}
                        >
                            <RxDotFilled />
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default ImageSlider;

