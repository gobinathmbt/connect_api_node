import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import SwiperCore from 'swiper';
SwiperCore.use([Autoplay]);

const SmallSwiperCard = (props) => {
  const data = props.data;

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{ delay: 3000 }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div>
            <div className="container-fluid">
              <div className="row smallcard">
                <div className="col-sm-8 smallcard1">
                  <div>
                    <h1>{item.month}</h1>
                  </div>
                  <div>
                    <h4>{item.year}</h4>
                  </div>
                </div>
                <div className="col-sm-4 smallcard2">
                  <div>
                    <h1>{item.num}</h1>
                  </div>
                  <div>
                    <h5>Students Recruited</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SmallSwiperCard;
