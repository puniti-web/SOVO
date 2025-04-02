import React from "react";
import style from "./Home.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
 
import { Toppage } from "./Top_page";
import { Pass } from "./pass";
import { CarePass } from "./CarePass";
import { Elements } from "./elements";
import {Crouser} from "./Crouser";
import styles from "./c.module.css"
import { TextAnimation } from "./TextAnimation";

export const Scroll = () => {
  
  AOS.init();
  return (
    <div className={style.mainbody}>
     
       <Toppage/>

      {/* ----------------------------------------------- */}
      <div className={style.needs}>
       
       
        <div className={style.pro_box}>
           <Pass/>
        </div>
         
     <div className={style.mdiv}>
         <div className={style.b}>
          <div data-aos="fade-down-left" data-aos-duration="2000">
            {" "}
            <img
              src="https://gymnation.com/media/d1qhvgwn/ai-driven-fitness-revolution-how-technology-is-shaping-your-wellness-journey.jpg"
              alt=""
            />
          </div>
          <div data-aos="fade-down-right" data-aos-duration="4000">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQFg712c8xoEuA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1719814801975?e=2147483647&v=beta&t=2bgd_pRj2LerLSbFt7nd9Bd4_G1jKYncbca6Hk55P54"
              alt=""
            />
          </div>
        </div>

        <div data-aos-duration="2000" className={style.c}>
          <img
            data-aos="fade-down-left"
            data-aos-duration="1000"
            src="https://ml.globenewswire.com/Resource/Download/5a689f15-16cd-4eb8-91f7-100c3e81c6c7"
            alt=""
          />
          <img
            data-aos="fade-down-right"
            data-aos-duration="2000"
            src="https://media.licdn.com/dms/image/v2/D4D12AQHv9N-7erXkPw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715854912489?e=2147483647&v=beta&t=KQzOkc1nbekVEikGlbfqPO8r_PUc7k0LmHl_bQ5X02U"
            alt=""
          />
        </div>
        <div data-aos="fade-down" data-aos-duration="1000" className={style.d}>
          {" "}
          <img
            src="https://aijourn.com/wp-content/uploads/2024/06/AI-Fitness-App-featured-pic-1.jpg"
            alt=""
          />
        </div>

        

        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className={style.f1}
        >
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrzusxDNgQKncOo3IjwCjOw-LJAhwoa35Sg&s"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQFg712c8xoEuA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1719814801975?e=2147483647&v=beta&t=2bgd_pRj2LerLSbFt7nd9Bd4_G1jKYncbca6Hk55P54"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://iotloops.com/wp-content/uploads/2022/09/IoT_fitness-industry.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGifn7Py5RDGbqPE80FM-SzFp5BpDZ_ZcUFg&s"
              alt=""
            />
          </div>
        </div>

        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className={style.f2}
        >
          <div>
            <img
              src="https://www.cnet.com/a/img/resize/f6408c59cb83bc9d9434b2474b9058af9369d1db/hub/2023/05/16/2af05bb6-3454-4318-9083-a559ecf9e896/gettyimages-1295298286.jpg?auto=webp&fit=crop&height=1200&width=1200"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://media.licdn.com/dms/image/v2/D4E12AQHQoL1FRJz8Ig/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1701115387699?e=2147483647&v=beta&t=axRYjSOeemOov1jCkjd8E7ofequLo9WGqSTqMVahaL8"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://www.yankodesign.com/images/design_news/2022/12/this_smart_camera_turns_any_TV_into_your_personal_trainer_08.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://i0.wp.com/www.quytech.com/blog/wp-content/uploads/2020/08/AI-in-Fitness-app.png?resize=830%2C395&ssl=1"
              alt=""
            />
          </div>
        </div>


        <div className={styles.tanimation}>
          <TextAnimation/>
        </div>
         </div>

 
         <CarePass/>

         <Elements/>  
          
          <div className={styles.crouser}>
            <Crouser/>
          </div>
      </div>
    </div>
  );
};
