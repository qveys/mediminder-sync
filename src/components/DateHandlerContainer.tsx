
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
        // Ensure the DOM is ready and the container exists
        const initializeSlider = () => {
            if (sliderRef.current && sliderRef.current.children.length > 0) {
                // Destroy existing instance if it exists
                if (sliderInstance.current) {
                    sliderInstance.current.destroy();
                }

                try {
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
                        preventScrollOnTouch: 'auto',
                        loop: false
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
                } catch (error) {
                    console.error('Error initializing tiny-slider:', error);
                }
            }
        };

        // Small delay to ensure children are rendered
        const timeoutId = setTimeout(initializeSlider, 0);

        return () => {
            clearTimeout(timeoutId);
            if (sliderInstance.current) {
                sliderInstance.current.destroy();
            }
        };
    }, [selectedDate, onDateChange]); // Add dependencies to ensure slider is re-initialized when needed

    return (
        <div className="relative overflow-hidden">
            <div ref={sliderRef} className="h-[calc(100vh-16rem)]">
                <div className="h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
