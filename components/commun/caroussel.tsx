import React from 'react'
import Slider from 'react-slick'
import VerticalCard from '../card/verticalCard'
import HorizontalCard from '../card/horizontalCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Container } from '@mui/material'
import HomeSliderCard from '../card/HomeSliderCard'

export default function Caroussel(props: any) {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // arrows: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: props?.data?.length >= 3 ? 3 : props?.data?.length
        }
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: props?.data?.length >= 2 ? 2 : props?.data?.length
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Container fixed maxWidth={props?.type === 'home1' || props?.type === 'home2' ? 'xl' : 'lg'}>
      <Box
        sx={{
          marginBottom: '40px'
        }}
      >
        <Slider {...settings}>
          {props?.data?.map((item: any, index: any) => (
            <div key={index}>
              {props?.type === 'vertical' ? (
                <VerticalCard
                  key={index}
                  imageUrl={item?.image}
                  title={item?.title}

                  // id={item?._id}
                />
              ) : props?.type === 'home1' ? (
                <HomeSliderCard
                  type={1}
                  key={index}
                  imageUrl={item?.image || '/image/team1.png'}
                  title={item?.title}
                  lessons={item?.lessons}
                  students={item?.students}
                  id={item?._id}
                />
              ) : props?.type === 'home2' ? (
                <HomeSliderCard
                  type={2}
                  // id={item?._id}
                  imageUrl={item?.image}
                  title={item?.title}
                  description={item?.description}
                  link={item?.link}
                />
              ) : (
                <HorizontalCard
                  key={index}
                  imageUrl={item?.image}
                  authorName={item?.title ? item?.title : item?.firstName + ' ' + item?.lastName}
                  description={item.description}
                  cardWidth='100%'
                  imagePosition='right'
                  border={true}
                  variant='expert'
                  id={item?._id}
                />
              )}
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  )
}
