import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ErrorNotification(props) {
  const { message, index, setErrorNotifications } = props;
  const removeNotification = useRef();

  useEffect(() => {
    removeNotification.current = setTimeout(() => {
      setErrorNotifications((prev) => prev.slice(1));
    }, 5000);

    return () => clearTimeout(removeNotification.current);
  }, []);

  function removeNotificationCard() {
    setErrorNotifications((prev) => prev.slice(1));
    clearTimeout(removeNotification.current);
  }

  return (
    <motion.div
      onClick={removeNotificationCard}
      initial={{
        opacity: 0,
        x: "500px",
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          mass: 0.5,
          damping: 8,
        },
      }}
      exit={{
        opacity: 0,
        x: "500px",
      }}
      whileTap={{ scale: 0.9 }}
      className="w-full p-2 bg-charcoal-gray-700 border border-red-600 text-red-600 rounded-lg cursor-pointer"
    >
      {message}
    </motion.div>
  );
}
