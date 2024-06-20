import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

const ExpandableCard = forwardRef(({ content , setExpanded}, ref) => {


  return (
    <motion.div ref={ref} className='Expanded' layoutId={content.id}>
      <motion.div className="card-title">
        <motion.h4>{content.heading}</motion.h4>
        <motion.div className="buttons">
            <motion.button onClick={setExpanded} className='btn'>Close</motion.button>
        </motion.div>
      </motion.div>
      <motion.div style={{color:'#005F73',"width" : "100%", "height" : "70%", "display" : "flex", "justifyContent" : "center", "alignItems" : "center"}}>Comming Soon</motion.div>
    </motion.div>
  );
});

const CompactCard = ({ content , setExpanded }) => {
  
    return (
        <motion.div layoutId={content.id} onClick={setExpanded} className='NavOptions'>
            {content.icon} {content.heading}
        </motion.div>
    );
  };

const NavCard = ({content}) => {
    const [isExpanded, setExpanded] = useState(false);
    const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    isExpanded ? 
      <ExpandableCard ref={cardRef} setExpanded={() => setExpanded(false)} content={content}/>
      : <CompactCard setExpanded={() => setExpanded(true)} content={content}/>
  );
};

export default NavCard;