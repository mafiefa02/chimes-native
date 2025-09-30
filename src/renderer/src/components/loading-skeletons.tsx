import { Skeleton } from '../components/ui/skeleton';
import { itemVariantsFromTop } from '../lib/animations';
import { motion } from 'motion/react';
import { useMemo } from 'react';

export const LoadingSkeletons = () => {
  const randomNumberOfDummies = useMemo(
    () => Math.max(5, Math.floor(Math.random() * 10)),
    [],
  );

  return new Array(randomNumberOfDummies).fill(0).map((_, idx) => (
    <motion.div
      key={`loading-${idx}`}
      variants={itemVariantsFromTop}
    >
      <Skeleton className="w-full h-24 bg-primary/5 rounded-3xl" />
    </motion.div>
  ));
};
