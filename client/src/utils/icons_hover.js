// utility.js
import { gsap } from 'gsap';

export const addHoverEffect = (icon) => {
  const handleMouseMove = (e) => {
    const bounds = icon.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const { clientX, clientY } = e;

    if (
      clientX >= bounds.left &&
      clientX <= bounds.right &&
      clientY >= bounds.top &&
      clientY <= bounds.bottom
    ) {
      const x = clientX - centerX;
      const y = clientY - centerY;

      gsap.to(icon, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
    
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    
    });
  };

  icon.addEventListener('mousemove', handleMouseMove);
  icon.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    icon.removeEventListener('mousemove', handleMouseMove);
    icon.removeEventListener('mouseleave', handleMouseLeave);
  };
};

