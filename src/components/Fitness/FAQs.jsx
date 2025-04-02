import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"

const content = [
    {
        que: "What is SOVO?",
        ans: "At SOVO, we make fitness fun and easy. We have AI,sensors to track workouts ranging from yoga to Boxing.Workouts can be done at home with the help of do it yourself (DIY) workout videos.  a world-class experience."
    },
    {
        que: "What kind of workout formats are available at SOVO?",
        ans: "At SOVO, you’ll find a wide variety of workout formats, such as - Boxing, Dance Fitness, Yoga, S&C. These workouts focus on strength, muscle endurance, flexibility, stamina & balance. So mix it up, pick formats that help you achieve your personal fitness goals."
    },
    {
        que: "How is the SOVO different from a regular gym?",
        ans: "With our non-conventional training facility, we aim to help you workout at your home with the help of our technology."
    },
    {
        que: "What is SOVO ELITE?",
        ans: "Cultpass ELITE  is a membership pack where you get unlimited access to our technology."
    },
    {
        que: "Are SOVO classes beginner friendly?",
        ans: "Don’t worry! All our classes are beginner friendly. Since you are doing an at Home, DIY session with our technology"
    },
    {
        que: "What is a SOVO Home?",
        ans: "cultpass Home gives you unlimited access to all our technology."
    },
    {
        que: "What is the difference between gyms and SOVO?",
        ans: "Gyms are again the traiditional way of doing exercise beacuse its not very flexible due to time constraints but we provide outstanding technology at SOLVO that basically is flexible,helps in socialising in short solves your problem"
    },
    {
        que: "What are the different types of Memberships that I can buy to access SOVO?",
        ans: "You can access the SOVO by buying a SOVO ELITE or a SOVO PRO."
    },
]
export const FAQs = () => {
    return (
        <Box w="80%" mt ="70px" py="70px">

            <Flex justifyContent="space-between">
                <Stack spacing={5} textAlign='left'>
                    <Heading fontSize="5xl">FAQS</Heading>
                    <Text color="whiteAlpha.600" fontSize="xl">FITNESS</Text>
                </Stack>

                
            </Flex>


            <Accordion color="whiteAlpha.700" textAlign="left" mt="40px" allowToggle>
            {
                content.map((item, i) => (
                    <AccordionItem key={i}>
                        <Heading fontSize="xl">
                        <AccordionButton>
                            <Text fontSize="2xl"  py={5} as="span" flex='1' textAlign='left'>
                            {item.que}
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={5}>
                        {item.ans}
                        </AccordionPanel>
                    </AccordionItem>
                ))
            }
               

                {/* <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                        Section 2 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                    </AccordionPanel>
                </AccordionItem> */}
            </Accordion>
        </Box>
    )
}