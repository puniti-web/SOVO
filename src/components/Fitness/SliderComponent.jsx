import { Box, Image } from "@chakra-ui/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [
    {url: "https://res.cloudinary.com/peloton-cycle/image/fetch/c_fill,dpr_1.0,w_1280,h_720,x_905,y_1337/f_auto/q_auto/https://images.ctfassets.net/6ilvqec50fal/4etuYztO7f1eMUnRn8e4Ia/62281f46a148c25651f09b8f8287ad0c/GettyImages-1223389038.jpg"},
    {url: "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/03/GRT_Male_Sprinting_1296x728-header.jpg"},
    {url: "data:image/jpeg;base64,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"},
    {url: "https://www.thetimes.com/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F2b47ea46-b9d6-11e8-8048-68900eb6c6ec.jpg?crop=1280%2C720%2C0%2C0"},
];

export const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide:0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

    return (
        <Box w="80%">
            <Slider {...settings}>
                {
                    images.map((item, i) => (
                    <Box p="10px"
                    transition= "padding 0.5s"
                     _hover={{
                        p:"0"
                    }}>
                        <Image w="100%" src={item.url} />
                    </Box>
                ))
                }
            </Slider>
        </Box>
    )
}