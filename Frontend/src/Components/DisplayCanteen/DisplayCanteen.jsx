import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const DisplayCanteen = () => {
    const { canteenInfo = [] } = useContext(StoreContext); // Default to empty array if undefined
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    
    // Determine the number of canteens to display initially based on screen size
    const initialDisplayCount = window.innerWidth < 640 ? 2 : 4;
    const displayedCanteens = showAll ? canteenInfo : canteenInfo.slice(0, initialDisplayCount);

    return (
        <div id='display-canteen' className="p-4 max-w-7xl mx-auto">
            <h1 className="text-[35px] max-[700px]:text-[30px] max-[500px]:text-[26px] max-[400px]:text-[23px] font-bold mb-6 text-center text-gray-800 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Our Canteens
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedCanteens.length > 0 ? (
                    displayedCanteens.map((canteen) => (
                        <div 
                            key={canteen._id} 
                            className="w-full sm:w-[90%] md:w-[85%] lg:w-full mx-auto rounded-2xl shadow-md shadow-black/15 relative overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-red-600"
                        >
                            <div className="relative h-44 overflow-hidden border-b border-gray-200">
                                <img 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 rounded-t-2xl"
                                    src={'https://images.unsplash.com/photo-1662982696492-057328dce48b?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                                    alt={canteen.name} 
                                />
                            </div>
                            <div className="p-5 text-center">
                                <h2 className="text-lg font-semibold mb-1 text-black">{canteen.name}</h2>
                                <p className="text-xs text-gray-800">{canteen.location}</p>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1">
                                            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs text-gray-700">{canteen.openingTime || '8:00 AM'} - {canteen.closingTime || '6:00 PM'}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/food-list/${canteen._id}`);
                                            }}
                                            className="mt-2 w-[70%] bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-3 rounded-lg text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all"
                                        >
                                            Explore Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                        <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-md font-medium text-gray-900">No canteens available</h3>
                        <p className="mt-1 text-sm text-gray-500">Check back later for updates.</p>
                    </div>
                )}
            </div>

            {/* Show "Explore Canteens" button only if there are more canteens to show */}
            {!showAll && canteenInfo.length > initialDisplayCount && (
                <div className="flex justify-center mt-9">
                    <button
                        onClick={() => setShowAll(true)}
                        className="bg-gray-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-800 transition-all hover:scale-105"
                    >
                        🔽 Explore All Canteens
                    </button>
                </div>
            )}
        </div>
    );
};

export default DisplayCanteen;
