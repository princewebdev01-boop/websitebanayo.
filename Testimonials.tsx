import { useEffect, useState, useRef } from "react";
import { STATISTICS } from "../data";
import Icon from "./Icon";
import { motion, useInView } from "motion/react";

interface CounterProps {
  value: number;
  suffix: string;
}

function CounterUp({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // milliseconds count ticker clock duration
    const stepTime = Math.max(Math.floor(duration / value), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(value / 60); // Increment step
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={elementRef} className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tight">
      {count}
      <span className="text-blue-600">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="statistics" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATISTICS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center p-4 text-center space-y-2 border-r last:border-r-0 border-slate-100"
            >
              {/* Highlight icon container */}
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center">
                <Icon name={stat.iconName} size={18} />
              </div>

              {/* Number and counts label */}
              <CounterUp value={stat.count} suffix={stat.suffix} />

              <span className="font-sans text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
