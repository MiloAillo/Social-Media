import { motion } from "motion/react"

const LoadingDiv = () => {
    return (
        <motion.div 
            className="w-20 h-20 bg-white"
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 0, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
                duration: 1.7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.2
            }}
        />
    )
}

export default LoadingDiv