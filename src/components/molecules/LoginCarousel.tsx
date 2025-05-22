
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import reservation from "@/assets/reservation.png";
import report from "@/assets/report.png";
import booking from "@/assets/booking.png";

interface CarouselSlide {
	title: string;
	image: string;
	description: string;
}

const slides: CarouselSlide[] = [
	{
		title: "Get detailed reports",
		image: report,
		description: "Analyze hotel performance with comprehensive reporting tools"
	},
	{
		title: "Manage reservations",
		image: reservation,
		description: "Book and manage guest stays with our intuitive system"
	},
	{
		title: "Manage Booking",
		image: booking,
		description: "Streamline your booking process with our user-friendly interface"
	},
];

const LoginCarousel = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [activeIndex, setActiveIndex] = useState(0);

	// Auto advance slides
	useEffect(() => {
		if (!emblaApi) return;

		const interval = setInterval(() => {
			emblaApi.scrollNext();
		}, 5000);

		return () => clearInterval(interval);
	}, [emblaApi]);

	// Track active slide
	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setActiveIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi]);

	return (
		<div className="w-full">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{slides.map((slide, index) => (
						<div
							className="min-w-0 flex-[0_0_100%]"
							key={index}
						>
							<div className="flex flex-col items-center text-center p-4">
								<img
									src={slide.image}
									alt={slide.title}
									className="max-w-[400px] w-full h-auto mb-4"
								/>
								<h2 className="text-2xl font-semibold text-gray-800 mb-2">{slide.title}</h2>
								<p className="text-gray-600">{slide.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="carousel-dots mt-4">
				{slides.map((_, index) => (
					<button
						key={index}
						className={cn(
							"carousel-dot",
							activeIndex === index ? "active" : ""
						)}
						onClick={() => emblaApi?.scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default LoginCarousel;
