import React from 'react';
import ReactDom from 'react-dom';
import CTASection from './index';

import Enzyme, { shallow, render as erender, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { render, screen, cleanup } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
    cleanup();
})

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


it('renders correctly enzyme', () => {
    const wrapper = shallow(<CTASection {...data} />)

    expect(toJson(wrapper)).toMatchSnapshot();
})


// Legacy
it('should render cta-section component', () => {
    render(<CTASection {...data} />);
    const ctaSection = screen.getByTestId('cta-section');
    expect(ctaSection).toBeInTheDocument();
})

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<CTASection {...data}></CTASection>, div)
})

it("renders cta-section correctly", () => {
    const { getByTestId } = render(<CTASection {...data}></CTASection>);
    expect(getByTestId('cta-section')).toHaveTextContent("Die MoWo Story");
})

it("renders cta-section correctly", () => {
    const { getByTestId } = render(<CTASection {...data}></CTASection>);
    expect(getByTestId('cta-section')).toHaveTextContent("Verstehe besser was hinter MoWo steckt");
})

it("renders cta-section correctly", () => {
    const { getByTestId } = render(<CTASection {...data}></CTASection>);
    expect(getByTestId('cta-section')).toContainHTML("image");
})

