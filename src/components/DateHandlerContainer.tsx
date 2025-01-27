import React, {useRef, useState} from "react";

interface DateHandlerContainerProps {
    children: React.ReactNode;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export const DateHandlerContainer: React.FC<DateHandlerContainerProps> = ({children, selectedDate, onDateChange}) => {
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartX.current || isAnimating) return;
        const currentX = e.touches[0].clientX;
        const diff = touchStartX.current - currentX;

        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${-diff}px)`;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX.current || isAnimating) return;

        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX.current;

        if (Math.abs(diff) > 100) {
            setIsAnimating(true);
            const newDate = new Date(selectedDate);

            if (diff > 0) {
                newDate.setDate(selectedDate.getDate() + 1);
            } else {
                newDate.setDate(selectedDate.getDate() - 1);
            }

            onDateChange(newDate);

            setTimeout(() => {
                setIsAnimating(false);
                if (containerRef.current) containerRef.current.style.transform = "";
            }, 300);
        } else {
            if (containerRef.current) containerRef.current.style.transform = "";
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="overflow-hidden"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {children}
        </div>
    );
};