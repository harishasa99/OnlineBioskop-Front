import React, { createContext, useContext, useState } from "react";

const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SliderContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};
