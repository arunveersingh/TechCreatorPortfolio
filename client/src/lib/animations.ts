export const fadeIn = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export const slideIn = (direction: 'left' | 'right') => ({
  hidden: { 
    opacity: 0,
    x: direction === 'left' ? -50 : 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
});
