import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import AppDownload from '../../Components/AppDownload/AppDownload';
import DisplayCanteen from '../../Components/DisplayCanteen/DisplayCanteen';
import Recommendations from '../../Components/Recommendations/Recommendations';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* {!isMobile && <Header />} */}
      <Recommendations />
      {/* <ExploreMenu category={category} setCategory={setCategory} /> */}
      {/* <FoodDisplay category={category}/> */}
      <DisplayCanteen />
      <AppDownload />
    </div>
  );
};

export default Home;
