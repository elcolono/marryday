import Image from "./CustomImage"
import React from "react"

import ReactIdSwiper from "react-id-swiper"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

const SwiperGallery = (props) => {
  const data = props.data
  const [lightBoxOpen, setLightBoxOpen] = React.useState(false)
  const [activeImage, setActiveImage] = React.useState(0)

  const onClick = (index) => {
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  const edgeSlidesClick = React.useCallback((index) => {
    onClick(index)
  }, [])

  // TODO: WITH THIS CODE AND ERROR OCCURS IF MORE THAN 3 IMAGES
  // React.useEffect(() => {
  //   const firstSlide = document.querySelector(".swiper-slide-prev")
  //   const lastSlide = document.querySelector(".swiper-slide-duplicate-next")

  //   firstSlide.addEventListener("click", () => edgeSlidesClick(data.length - 1))
  //   firstSlide.previousSibling.addEventListener("click", () =>
  //     edgeSlidesClick(data.length - 2)
  //   )
  //   lastSlide.addEventListener("click", () => edgeSlidesClick(1))
  //   lastSlide.previousSibling.addEventListener("click", () =>
  //     edgeSlidesClick(0)
  //   )
  //   return () => {
  //     firstSlide.removeEventListener("click", () => edgeSlidesClick())
  //     firstSlide.previousSibling.removeEventListener("click", () =>
  //       edgeSlidesClick()
  //     )
  //     lastSlide.addEventListener("click", () => edgeSlidesClick())
  //     lastSlide.previousSibling.addEventListener("click", () =>
  //       edgeSlidesClick()
  //     )
  //   }
  // }, [edgeSlidesClick])

  const params = {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    roundLengths: true,
    centeredSlides: true,

    pagination: {
      el: `.swiper-pagination.swiper-pagination-white`,
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  }
  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  }
  return (
    <React.Fragment>
      <ReactIdSwiper {...params}>
        {data.map((item, index) => (
          <div key={index} className="img-gallery">
            <Image
              src={item.image}
              width={1350}
              height={900}
              layout="responsive"
              alt={item.alt}
              loading="eager"
              className="img-fluid img-gallery"
              sizes="35vw"
              onClick={() => onClick(index)}
            />
          </div>
        ))}
      </ReactIdSwiper>

      {lightBoxOpen && (
        <Lightbox
          mainSrc={data[activeImage].image}
          nextSrc={data[(activeImage + 1) % data.length].image}
          prevSrc={data[(activeImage + data.length - 1) % data.length].image}
          onCloseRequest={() => setLightBoxOpen(false)}
          imageCaption={data[activeImage].title}
          onMovePrevRequest={() =>
            setActiveImage((activeImage + data.length - 1) % data.length)
          }
          onMoveNextRequest={() =>
            setActiveImage((activeImage + 1) % data.length)
          }
          enableZoom={false}
          reactModalStyle={customStyles}
        />
      )}
    </React.Fragment>
  )
}

export default SwiperGallery
