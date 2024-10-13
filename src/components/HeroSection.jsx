import "./Style/HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const HeroSection = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
          <div className="d-flex flex-column flex-md-row border rounded">
            <div className="heroTxt d-flex justify-content-center align-items-center py-4 py-md-0">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <p className="line"></p>
                  <p>OUR BESTSELLERS</p>
                </div>
                <h1>Latest Arrivals</h1>
                <div className="d-flex align-items-center gap-2">
                  <p>SHOP NOW</p>
                  <p className="line"></p>
                </div>
              </div>
            </div>
            <img
              className="heroImg"
              src="/imgs/TShirtModel2.jpg"
              alt="T-Shirt Model2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex flex-column flex-md-row border rounded">
            <div className="heroTxt d-flex justify-content-center align-items-center py-4 py-md-0">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <p className="line"></p>
                  <p>OUR BESTSELLERS</p>
                </div>
                <h1>Latest Arrivals</h1>
                <div className="d-flex align-items-center gap-2">
                  <p>SHOP NOW</p>
                  <p className="line"></p>
                </div>
              </div>
            </div>
            <img
              className="heroImg"
              src="/imgs/TShirtModel1.jpg"
              alt="T-Shirt Model1"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroSection;
