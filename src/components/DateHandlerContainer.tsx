import React, { useEffect, useRef } from 'react';
import { tns } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";
import { addDays, subDays } from 'date-fns';

interface DateHandlerContainerProps {
    children: React.ReactNode;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

export const DateHandlerContainer = ({ children, selectedDate, onDateChange }: DateHandlerContainerProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInstance = useRef<any>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderInstance.current = tns({
                container: sliderRef.current,
                items: 1,
                slideBy: 1,
                speed: 300,
                nav: false,
                controls: false,
                mouseDrag: true,
                touch: true,
                autoplay: false,
                autoHeight: true,
                preventScrollOnTouch: 'auto'
            });

            sliderInstance.current.events.on('transitionEnd', () => {
                const info = sliderInstance.current.getInfo();
                const direction = info.indexCached < info.index ? 'next' : 'prev';
                
                if (direction === 'next') {
                    onDateChange(addDays(selectedDate, 1));
                } else {
                    onDateChange(subDays(selectedDate, 1));
                }
            });
        }

        return () => {
            if (sliderInstance.current) {
                sliderInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="relative overflow-hidden">
            <div ref={sliderRef} className="h-[calc(100vh-16rem)]">
                <div className="h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};