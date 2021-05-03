import { render, screen, cleanup } from '@testing-library/react';
import CTASection from '../../components/Section/Cta';

afterEach(() => {
    cleanup();
})

it

test('should render cta-section component', () => {
    const data = {
        image: {
            title: "mowo-space-coworking.jpg",
            url: "https://mowo-production.s3.amazonaws.com/images/pexels-cowomen-2041627.original.jpg",
            layout: "video-1"
        },
        heading: "Die MoWo Story",
        description: "Verstehe besser was hinter MoWo steckt",
        button_text: "Über uns",
        button_href: { slug: "about-us" },
    };
    render(<CTASection {...data} />);
    const ctaSection = screen.getByTestId('cta-section');
    expect(ctaSection).toBeInTheDocument();
})