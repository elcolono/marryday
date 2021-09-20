import React from 'react'

import HeadingSection from './Heading';
import ContentSection from './Content';
import PricingSection from './Pricing';
import ContactSection from './Contact';
import ServiceSection from './Services';
import CTASection from './Cta';
import TextWithImage from './TextWithImage';
import HeroWithSearchBarSection from "./HeroWithSearchBar";
import TopicSlider from "./TopicSlider";
import ProductSlider from "./ProductSlider";


const Components = {
    'hero_with_search_bar': HeroWithSearchBarSection,
    'service_section_block': ServiceSection,
    'topic_slider': TopicSlider,
    'product_slider': ProductSlider,
    'page_heading_section_block': HeadingSection,
    'content_section_block': ContentSection,
    'pricing_section_block': PricingSection,
    'contact_section_block': ContactSection,
    'cta_section_block': CTASection,
    'text_with_image_section_block': TextWithImage,
}

const DynamicComponent = (props) => {
    const {section, productCategories} = props;
    // check if component is defined above
    if (typeof Components[section.type] !== 'undefined') {
        const Component = Components[section.type]
        return (<Component {...section.value} productCategories={productCategories}/>)
    }

    // fallback if the component doesn't exist
    return (<p>The component <strong>{section.type}</strong> has not been created yet.</p>)
}

export default DynamicComponent