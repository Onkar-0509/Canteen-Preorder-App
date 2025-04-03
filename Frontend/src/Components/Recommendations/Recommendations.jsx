import { useState, useEffect, useContext, useMemo } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const MealCard = ({ meal, URL, isActive = false, canteenName }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden w-full mx-auto transition-all duration-300 ${
        isActive ? 'scale-100 md:scale-110 z-10' : 'scale-90 opacity-60 md:opacity-80'
      }`}
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          onClick={() => navigate(`food-list/${meal.canteenId}`)}
          className="w-full h-full object-cover cursor-pointer"
          src={meal.image}
          alt={meal.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full flex items-center text-xs md:text-sm font-bold">
          <FaStar className="mr-1 text-yellow-600" />
          {meal.rating || Math.floor(Math.random() * 2 + 3)}.{Math.floor(Math.random() * 9)}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">{meal.name}</h3>
        <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4 line-clamp-2">{meal.description}</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs md:text-sm font-medium">Canteen: {canteenName}</p>
          </div>
          <p className="text-orange-500 font-bold text-base md:text-lg">₹{meal.price}</p>
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const { food_list = [], URL, canteenInfo } = useContext(StoreContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canteenName, setCanteenName] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Get 5 random unique items from food_list
  const displayItems = useMemo(() => {
    // If 5 or fewer items, return them all
    if (food_list.length <= 5) return [...food_list];
    
    // Fisher-Yates shuffle algorithm to get random items
    const shuffled = [...food_list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  }, [food_list]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (displayItems.length > 1 && !isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayItems.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [displayItems.length, isMobile]);

  useEffect(() => {
    if (displayItems.length > 0) {
      const currentMeal = displayItems[currentIndex];
      const foundCanteen = canteenInfo.find(canteen => canteen._id === currentMeal.canteenId);
      setCanteenName(foundCanteen ? foundCanteen.name : "Unknown");
    }
  }, [currentIndex, displayItems, canteenInfo]);

  if (!displayItems.length) {
    return (
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 text-center">
        <h1 className="text-[44px] max-[700px]:text-[37px] max-[500px]:text-[32px] max-[400px]:text-[27px] font-bold text-orange-500 mb-4">Recommendations</h1>
        <p className="text-gray-500">No recommendations available</p>
      </div>
    );
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % displayItems.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  const getVisibleCards = () => {
    if (isMobile) {
      return [{ meal: displayItems[currentIndex], isActive: true }];
    }

    // For carousel display with adjacent cards
    const prevIndex = (currentIndex - 1 + displayItems.length) % displayItems.length;
    const nextIndex = (currentIndex + 1) % displayItems.length;

    return [
      { meal: displayItems[prevIndex], isActive: false },
      { meal: displayItems[currentIndex], isActive: true },
      { meal: displayItems[nextIndex], isActive: false },
    ];
  };

  return (
    <div id='recommendation' className="max-w-7xl mx-auto py-8 md:py-12 px-4">
      <h1 className="text-[35px] max-[700px]:text-[30px] max-[500px]:text-[26px] max-[400px]:text-[23px] font-bold text-center text-orange-500 mb-6 md:mb-8">Recommendations</h1>

      <div className="relative">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {!isMobile && (
            <button
              onClick={prevCard}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-md transition-colors z-20"
              aria-label="Previous recommendation"
            >
              <FaChevronLeft className="text-lg md:text-xl" />
            </button>
          )}

          <div className={`flex items-center justify-center ${isMobile ? 'w-full' : 'gap-4 relative w-full'}`}>
            {getVisibleCards().map((card, index) => (
              <div
                key={`${card.meal._id}-${index}`}
                className={`transition-all duration-300 ${isMobile ? 'w-full' : index === 1 ? 'w-full max-w-lg' : 'w-3/4 max-w-md'}`}
              >
                <MealCard meal={card.meal} URL={URL} isActive={card.isActive} canteenName={canteenName} />
              </div>
            ))}
          </div>

          {!isMobile && (
            <button
              onClick={nextCard}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-md transition-colors z-20"
              aria-label="Next recommendation"
            >
              <FaChevronRight className="text-lg md:text-xl" />
            </button>
          )}
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={prevCard}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-md transition-colors"
              aria-label="Previous recommendation"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextCard}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-md transition-colors"
              aria-label="Next recommendation"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        <div className="flex justify-center mt-4 md:mt-6 gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentIndex === index ? 'bg-orange-500 md:w-6' : 'bg-gray-300'}`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;