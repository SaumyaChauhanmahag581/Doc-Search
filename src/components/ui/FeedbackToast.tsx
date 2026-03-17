import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

export interface FeedbackData {
  message: string;
  type: 'success' | 'error';
}

interface FeedbackToastProps {
  feedback: FeedbackData | null;
}

export default function FeedbackToast({ feedback }: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-6 py-3 rounded-full shadow-lg text-white font-bold flex items-center ${feedback.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {feedback.type === 'success' ? <Check size={18} className="mr-2" /> : <X size={18} className="mr-2" />}
            {feedback.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
