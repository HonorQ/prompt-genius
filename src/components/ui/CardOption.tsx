import { motion } from 'framer-motion';
import { cn } from './Button';

interface CardOptionProps {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function CardOption({ title, description, selected, disabled = false, onClick }: CardOptionProps) {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'relative rounded-2xl p-5 border transition-all duration-300 ease-out',
        disabled ? 'cursor-not-allowed opacity-40 bg-white/5 border-white/5 grayscale' : 'cursor-pointer',
        !disabled && selected 
          ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.2)]' 
          : !disabled ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10' : ''
      )}
    >
      {selected && !disabled && (
        <motion.div 
          layoutId="card-active-glow"
          className="absolute inset-0 rounded-2xl bg-purple-500/10 pointer-events-none"
        />
      )}
      <div className="relative z-10">
        <h3 className={cn("text-lg font-semibold mb-1", selected && !disabled ? "text-purple-300" : "text-slate-200")}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {disabled && (
          <p className="text-xs text-red-400/80 mt-2 font-medium flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400/80 inline-block"></span>
            与当前选择冲突
          </p>
        )}
      </div>
    </motion.div>
  );
}
