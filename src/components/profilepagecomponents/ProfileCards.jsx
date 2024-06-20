import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import './style.css';
import { RxCross2 } from "react-icons/rx";

const ExpandableCard = forwardRef(({ content , setExpanded}, ref) => {
  return (
    <motion.div ref={ref} className='Expanded' layoutId={content.id}>
      <motion.div className="card-title">
        <motion.h4>{content.heading}</motion.h4>
        <motion.button onClick={setExpanded}><RxCross2 /></motion.button>
      </motion.div>
      {content.body}
    </motion.div>
  );
});

const CompactCard = ({ content , setExpanded }) => {
  
    return (
        <motion.div layoutId={content.id} onClick={setExpanded} className='cards' style={{"width" : "18%"}}>
          <motion.div className='heading'>{content.heading}</motion.div>
          <motion.div className='sub-heading'>{content.subheading}</motion.div>
        </motion.div>
    );
  };

const ProfileCards = ({content}) => {
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
      <ExpandableCard ref={cardRef} setExpanded={() => setExpanded(false)} content={content} style={{overflowY:"auto"}}/>
      : <CompactCard setExpanded={() => setExpanded(true)} content={content}/>
  );
};

export default ProfileCards;