import { CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { BsDot } from "react-icons/bs";
import { Box, Button, Center, Flex, Heading, HStack, Icon, Image, List, ListIcon, ListItem, Show, Stack, Text } from "@chakra-ui/react"
import { FitnessCarousel2 } from "./FitnessCarousel2";
import { FitnessCarousalTop } from "./FitnessCarouselTop";
import { Plans } from "./Plans";
import { TbDiscount } from "react-icons/tb";
import { FAQs } from "./FAQs";
import { SliderComponent } from "./SliderComponent";
import { useEffect, useRef, useState } from "react";
import { TopCards } from "./TopCards";

const midSectionContent = [
    {
        name: "AI Yoga",
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

const images1 = [
    {url:"https://www.shutterstock.com/image-photo/hologram-athlete-running-wellness-exercise-600nw-2240460425.jpg"},
    {url:"https://i0.wp.com/www.quytech.com/blog/wp-content/uploads/2024/06/smart-gym-equipment.png?ssl=1"},
];

const images2 = [
    {url:"https://img.freepik.com/premium-photo/woman-exercising-futuristic-gym-with-large-interactive-screen_14117-824788.jpg"},
    {url:"https://stayfitcentral.com/wp-content/uploads/2023/12/DALL%C2%B7E-2024-01-02-14.38.34-A-futuristic-AI-chatbot-named-Endura-designed-as-a-personal-trainer-and-fitness-assistant.-The-chatbot-has-a-sleek-modern-design-with-a-holographic-.png"},
];

export const FitnessIndex = () => {
    const [index, setIndex] = useState(0);

    const inputIndex = useRef(null);

    const handleClick= (i) =>{
        clearInterval(inputIndex.current);
        inputIndex.current = null;
        setIndex(i);
        handleInterval();
    }

    const handleInterval = () => {
        if(inputIndex.current == null){
            inputIndex.current = setInterval(()=>{
                setIndex(prev => {
                    if(prev === images1.length-1)
                        return 0;
                    else    
                        return prev+1;
                });
            }, 3000);
        }
    }
    useEffect(()=>{
        handleInterval();
    }, [index]);




    return (
        <Box bgColor="#12151A" color="white">

        {/* --------- Top view ------------  */}
           
            <Box
            minH="100vh"
            bgImage="url('https://cdn.prod.website-files.com/64f43cafcf13d99e5dc4aa20/65844c51913bac637571f707_Burpee%20AI%20fitness%20app.png')"
            position="relative"
            bgRepeat="no-repeat"
            bgSize="100% 100%"            
            >
                <Button 
                fontWeight="bold" 
                color="red.400" 
                mt={{base:"70%", md: "50%", lg:"25%"}}
                >TRY FOR FREE</Button>

                <Show above="md">
                    <TopCards />
                </Show>
            </Box>

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
                <Heading fontSize="5xl">AI-led classes</Heading>
            </Box>
            

            {/* ----- carousel------------ */}

            <SliderComponent />

            <Box my="50px">
                <Text color="whiteAlpha.700" fontWeight="bold" fontSize="2xl">AT-HOME</Text>
                <Heading fontSize="5xl">Unlimited home workouts with calorie tracking</Heading>
            </Box>
            


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
            </Flex>

            {/* <Box my="50px">
                <Heading fontSize="5xl">Choose your carepass</Heading>
                <Text color="whiteAlpha.700" fontWeight="bold" fontSize="2xl">3 flexible plans to suit your fitness needs</Text>
            </Box>
             */}

            {/* <Plans /> */}

            {/* <Heading fontSize="5xl" my="50px" mt="130px">FREE TRIALS</Heading>  */}

            {/* <Flex 
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


            <Flex mt="100px" 
            ml="10%" w="80%" 
            justifyContent="space-between"
            direction={{base:"column", md:"row"}}
            gap="20px"
            >
                <Stack spacing="20px" w={{md:"45%"}} textAlign="left">
                    <Heading fontSize="4xl">
                        SOVO <Text as="span" color="orange.300">ELITE</Text>
                    </Heading>
                    {/* <Heading fontSize="5xl">
                        Unlimited access to everything in your city
                    </Heading> */}
                    {/* <Heading fontSize="2xl">Unlimited access to</Heading> */}

                    {/* <List fontSize="md" color="whiteAlpha.800" fontWeight="bold">
                        <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            At-center group classes
                        </ListItem>

                        <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            All ELITE & PRO gyms
                        </ListItem>

                        <ListItem>
                            <ListIcon color="red.400" p="2px" border="1px" borderRadius="50%" as={CheckIcon} />
                            At-home live workouts
                        </ListItem>
                    </List> */}

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
                    <Image borderRadius="20px" src={images1[index].url} />
                    <Flex gap="10px" justifyContent="center">
                    {
                        Array(2).fill(0).map((item, i) => (
                            <MinusIcon
                            fontSize="3xl"
                            color={(index===i)?"red.400" : "white"}
                            onClick={() => handleClick(i)} key={i} />
                        ))
                    }
                    </Flex>
                    
                </Box>
            </Flex> 

            <Flex 
            mt="100px" pb="100px" 
            ml="10%" w="80%" 
            justifyContent="space-between"
            direction={{base:"column", md:"row"}}
            gap="20px"
            >
                <Box w={{md:"52%"}}>
                    <Image borderRadius="20px" src={images2[index].url} />
                    <Flex gap="10px" justifyContent="center">
                    {
                        Array(2).fill(0).map((item, i) => (
                            <MinusIcon 
                            fontSize="3xl"
                            color={(index===i)?"red.400" : "white"} 
                            onClick={() => handleClick(i)} key={i} />
                        ))
                    }
                    </Flex>
                </Box>
                <Stack spacing="20px" w={{md:"45%"}} textAlign="left">
                    <Heading fontSize="4xl">
                        SOVO <Text as="span" color="orange.300">PRO</Text>
                    </Heading>
                    {/* <Heading fontSize="5xl">
                    Unlimited access to PRO gyms in your city
                    </Heading> */}
                    {/* <Heading fontSize="2xl">Unlimited access to</Heading> */}

                    <List fontSize="md" color="whiteAlpha.800" fontWeight="bold">
                        {/* <ListItem>
                            <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text>All PRO gyms</Text>
                            </Flex>                            
                        </ListItem> */}

                        <ListItem>
                            {/* <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text> At-home live workouts</Text>
                            </Flex>                            */}
                        </ListItem>

                        <ListItem>
                            {/* <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text>2 sessions/month at ELITE gyms & group classes</Text>
                            </Flex> */}
                            
                        </ListItem>
                    </List>

                    <Stack >
                        <Text fontWeight="bold" color="whiteAlpha.700" fontSize="md">Starting at Rs. 1666/month</Text>
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

                
            </Flex>

            <Stack 
            w="70%" 
             
            textAlign="left"
            p="30px"
            spacing="5"
            borderRadius="20px"
            bgImage="url(https://hips.hearstapps.com/hmg-prod/images/hlh090120bodyaitrainer011-1599588635.jpg)"
            bgRepeat='no-repeat'
            // bgSize="100% 100%"
            bgSize="cover"
            
            >
                <Text fontSize="5xl">SOVO <Text color="hotpink" as="span">HOME</Text></Text>
                <Heading fontSize="5xl">Bring the AI home</Heading>

                <Stack>
                    <Heading fontSize="2xl">Unlimited access to</Heading>

                    <List spacing={2} fontSize="lg" fontWeight="bold" color="whiteAlpha.700">
                        <ListItem>
                            <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text>At-home workouts</Text>
                            </Flex>
                        </ListItem>
                        <ListItem>
                            <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text>Celebrity workouts</Text>
                            </Flex>
                        </ListItem>
                        <ListItem>
                            <Flex gap="2" alignItems="center">
                                <CheckIcon color="red.400" border="1px" padding="2px" borderRadius="50%" />
                                <Text>Goal-based workouts & meditation sessions</Text>
                            </Flex>
                            
                        </ListItem>
                    </List>
                </Stack>
                

                <Stack>
                    <Text color="whiteAlpha.700" fontSize="xl">Starting at Rs.117/month</Text>
                    <Flex direction={{base:"column", lg:"row"}} gap="5">
                        <Button fontWeight="bold" bgColor="gray">TRY FOR FREE</Button>
                        <Button fontWeight="bold" color="red.400">BUY NOW</Button>
                    </Flex>
                </Stack>
                
                <Flex gap="5px" alignItems="center">
                    <Icon color="orange.500" as={TbDiscount} /> 
                    <Text fontSize="sm">SALE ON NOW</Text>
                </Flex>
            </Stack> 

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