'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomSheetContainer } from './BottomSheet.style';
import { BottomSheetProps } from './BottomSheet.type';

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    onClose && onClose();
  };

  const bottomSheetContent = () => (
    <BottomSheetContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className='bs_layer'
          >
            <div
              onClick={handleClose}
              style={{ background: 'black', opacity: 0.5, position: 'absolute', inset: 0 }}
            ></div>
            <motion.div
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              className='bs_box-inner'
            >
              <div className='bs_header'></div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BottomSheetContainer>
  );

  return bottomSheetContent();
};

export default BottomSheet;
