'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

export default function WhatsAppFloat() {
  const number = INVITATION_CONFIG.whatsappNumber;
  const message = `Hello, I am reaching out regarding the wedding of ${INVITATION_CONFIG.brideName} and ${INVITATION_CONFIG.groomName}.`;

  const handleClick = () => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 2.5 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        color: '#fff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
        zIndex: 9000,
      }}
    >
      <FaWhatsapp size={28} />
    </motion.button>
  );
}
