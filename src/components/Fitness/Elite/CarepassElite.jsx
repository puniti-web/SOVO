import { CheckIcon } from "@chakra-ui/icons";
import { BsDot } from "react-icons/bs";
import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, List, ListIcon, ListItem, Show, Stack, Text } from "@chakra-ui/react"
import { FitnessCarousel2 } from "../FitnessCarousel2";
import { FitnessCarousalTop } from "../FitnessCarouselTop";
import { Plans } from "../Plans";
import { TbDiscount } from "react-icons/tb";
import { FAQs } from "../FAQs";
import { SliderComponent } from "../SliderComponent";
import { TopCards } from "../TopCards";


const midSectionContent = [
    {
        name: "AI yoga",
        // course: "Vinyasa Yoga: Stamina",
        courseType: "YOGA",
        level: "INTERMEDIATE",
        duration:"50 Min",
        live:"22+LIVE",
        image:"https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_400,q_auto:eco,dpr_2,f_auto,fl_progressive//image/diy/4a80e1c1-4bbd-4d92-b042-9ac1b6345bc0",
    },
    {
        name: "AI Cardio",
        // course: "Cardio HEAT",
        courseType: "CARDIO",
        level: "INTERMEDIATE",
        duration:"45 Min",
        live:"24+LIVE",
        image:"https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_400,q_auto:eco,dpr_2,f_auto,fl_progressive//image/diy/b56dc2d1-0e60-479a-bbc9-d728d0a7406c",
    },
    {
        name: "AI Dance",
        // course: "Dance Fitness Xtreme",
        courseType: "DANCE",
        level: "INTERMEDIATE",
        duration:"50 Min",
        live:"26+LIVE",
        image:"https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_400,q_auto:eco,dpr_2,f_auto,fl_progressive//image/diy/27013b41-1817-452c-9223-cc777d69fcf3",
    }
]


export const CarepassElite = () => {
  
    return (
        <Box bgColor="#12151A" color="white">

        {/* --------- Top view ------------  */}
        <Flex 
            ml="10%" w="80%" 
            justifyContent="space-between"
            direction={{base:"column", md:"row"}}
            gap="20px"
            >
                <Stack 
                pt="40px"
                spacing="20px" 
                w={{md:"45%"}} 
                textAlign="left">
                    <Heading fontSize="5xl">
                        SOVO <Text as="span" color="orange.300">ELITE</Text>
                    </Heading>
                    <Heading fontSize="5xl">
                        Unlimited access to
                    </Heading>
                    

                    <List fontSize="1.5rem" color="whiteAlpha.700" fontWeight="bold">
                        {/* <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            At-center group classes
                        </ListItem> */}

                        {/* <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            All ELITE & PRO gyms
                        </ListItem> */}

                        <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            At-home live workouts
                        </ListItem>
                    </List>

                    <Stack >
                        <Text fontWeight="bold" color="whiteAlpha.700" fontSize="md">Starting at Rs. 1499/month</Text>
                        <Flex gap="10px">
                            <Button bgColor="gray">TRY FOR FREE</Button>
                            <Button color="red.500">BUY NOW</Button>
                        </Flex>

                        <Flex alignItems="center" gap="5px" fontSize="0.9rem">
                            <Icon as={TbDiscount} color="orange.400" />
                            SALE ON NOW
                        </Flex>
                    </Stack>

                </Stack>
                <Box w={{md:"52%"}}>
                    <Image borderRadius="20px" src="https://www.soletreadmills.com/cdn/shop/articles/d5d902f4-3542-4a0d-9e7d-18863195dff5.jpg?v=1696364833&width=1400" />
               
                </Box>
            </Flex>
           

            <Show below="md">
                <TopCards />
            </Show>

            {/* ------- Carousal ---------  */}
            
            {/* <FitnessCarousalTop /> */}

            {/* ----------Carousal 2------------- */}
            
            
            {/* <Flex 
            w="80%"
            my="60px"
            alignItems="center"
            justifyContent="space-between"
            direction={{base:"column", md:"row"}}
            >
                <HStack>
                    <Heading fontSize="3xl">Centers near</Heading>
                    <Text fontSize="xl" textDecor="underline">Hinjewadi</Text>
                </HStack>
                <Heading cursor="pointer" fontSize="2xl" color="blue.400">VIEW ALL</Heading>
            </Flex>
            <FitnessCarousel2 /> */}


            {/* ------------ mid section ---------- */}
            
            <Box my="50px">
                <Text color="whiteAlpha.700" fontWeight="bold" fontSize="2xl">AT-HOME</Text>
                <Heading fontSize="5xl">AI-led tracking classes</Heading>
            </Box>
            

            {/* ----- carousel------------ */}

            <SliderComponent />

            {/* <Box my="50px">
                <Text color="whiteAlpha.700" fontWeight="bold" fontSize="2xl">AT-HOME</Text>
                <Heading fontSize="5xl">Unlimited home workouts with calorie tracking</Heading>
            </Box> */}
            

{/* 
            <Flex w="70%" 
            justifyContent="space-between"
            direction={{base:"column", md:"row"}}
            gap="10px"
            >
                {
                    midSectionContent.map((item, i) => (
                        <Box w={{base:"100%", md:"32%"}} position="relative" >
                            <Image borderTopLeftRadius="10px" borderTopRightRadius="10px"  w="100%" h="200px" src={item.image} />
                            <Stack spacing={3} borderRadius="0 0 10px 10px" textAlign="center" bgColor="gray.700" p="10px">
                                <Text fontSize="1.1rem" color="whiteAlpha.700">{item.name}</Text>
                                <Heading fontSize="2xl">{item.course}</Heading>
                                <Flex flexWrap="wrap" alignItems="center" color="whiteAlpha.700" justifyContent="center" gap="5px">
                                    <Text>{item.courseType}</Text>
                                    <Icon fontSize="xl" as={BsDot} />
                                    <Text>{item.level}</Text>
                                    <Icon fontSize="xl" as={BsDot} />
                                    <Text>{item.duration}</Text>
                                </Flex>
                                <Center>
                                    <Button  
                                    w="fit-content"
                                    bgColor="blackAlpha.400"
                                    boxSizing="border-box"
                                    _hover={{
                                        bgColor:"blackAlpha.300"
                                    }}
                                    > <Icon color="blue.400" fontSize="2xl" as={BsDot} /> JOIN</Button>
                                </Center>
                            </Stack>
                            <Button 
                            position="absolute"
                            top="5px"
                            left="5px"
                            
                            bgColor="blackAlpha.500">{item.live}</Button>
                        </Box>
                    ))
                }
            </Flex> */}

            {/* <Box my="50px">
                <Heading fontSize="5xl">Choose your carepass</Heading>
                <Text color="whiteAlpha.700" fontWeight="bold" fontSize="2xl">3 flexible plans to suit your fitness needs</Text>
            </Box> */}
            

            {/* <Plans />

            <Heading fontSize="5xl" my="50px" mt="130px">FREE TRIALS</Heading> 

            <Flex 
            h={{base:"300px", "1024":"350px", lg:"400px"}} 
            w="60%" 
            justifyContent="space-between" 
            alignItems="center"
            gap="20px"
            direction={{base:"column", md:"row"}}
            // border="1px"
            >
                <Box  w= {{base:"100%", md:"33%"}}>
                    <Image h={{base:"100%", md:"90%"}} src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_300,q_auto:eco,dpr_1,f_auto,fl_progressive/image/vm/22ae2a86-60e9-4de3-9180-678f40b69eb0.png" />
                </Box>
                <Box w= {{base:"100%", md:"33%"}}>
                    <Image h="100%" src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_300,q_auto:eco,dpr_1,f_auto,fl_progressive/image/vm/2ce1e296-e894-4f65-9dc1-d6ed11c031ae.png" />
                </Box>
                <Box w= {{base:"100%", md:"33%"}}>
                    <Image h={{base:"100%", md:"90%"}} src = "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_300,q_auto:eco,dpr_1,f_auto,fl_progressive/image/vm/1300abe0-318e-489c-8205-dc770cfe6e54.png" />
                </Box>
               
              
              
            </Flex>    */}


            

          

          

            {/* <Box
            mt="70px" 
            w="80%" 
            border="1px"
            >
                <Stack spacing={10} my="10" w="80%" textAlign="left">
                    <Box>
                        <Text fontSize="4xl">care transform</Text>
                        <Heading fontSize="4xl">Lose weight for good</Heading>
                    </Box>
                    

                    <List fontSize="xl" spacing={3}>
                        <ListItem>
                            <ListIcon />
                            Online Habit Coach
                        </ListItem>

                        <ListItem>
                            <ListIcon />
                            Detailed Nutritional Guidelines
                        </ListItem>

                        <ListItem>
                            <ListIcon />
                            Customized Workout Plan
                        </ListItem>

                        <ListItem>
                            <ListIcon />
                            Daily Check-ins & More!
                        </ListItem>

                    </List>

                    <Text color="blue.200">EXPLORE OFFERS</Text>
                </Stack>
            </Box> */}


            {/* ----------- FAQs section ------------ */}
            <FAQs />      
        </Box>
    )
}

