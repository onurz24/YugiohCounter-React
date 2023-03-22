import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Stars = ({ Status }) => {

  const navigate = useNavigate()
  const [stars, setStars] = useState([]);


  useEffect(() => {

    if (!Status) {
      navigate("/")
    }

    const newStars = [];
    for (let i = 0; i <= 25; i++) {
      newStars.push({
        id: `star${i}`,
        top: Math.floor(Math.random() * window.innerHeight),
        left: Math.floor(Math.random() * window.innerWidth),
        speed: Math.floor(Math.random() * 2) + 1,
      });
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    const animateStars = () => {
      setStars(prevStars => {
        const newStars = prevStars.map(star => {
          let newTop = star.top + star.speed;
          if (newTop > window.innerHeight) {
            newTop = 0;
            star.left = Math.floor(Math.random() * window.innerWidth);
          }
          return { ...star, top: newTop };
        });
        return newStars;
      });
      requestAnimationFrame(animateStars);
    };
    animateStars();
  }, []);

  return (
    <div className="Stars">
      {stars.map(star => (
        <div
          key={star.id}
          style={{ top: star.top, left: star.left }}
          className="Star"
        />
      ))}
    </div>
  );
};
