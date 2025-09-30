import emptyIllustration from '../../assets/empty.png';
import { fadeInOut } from '../lib/animations';
import { motion } from 'motion/react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <motion.div
      key="not-available"
      variants={fadeInOut}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-1 h-full items-center justify-center flex-col gap-8"
    >
      <img
        alt="Empty"
        src={emptyIllustration}
        className="size-56"
      />
      <div className="space-y-1 text-center">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-gray-500 text-lg">{description}</p>
      </div>
    </motion.div>
  );
};
