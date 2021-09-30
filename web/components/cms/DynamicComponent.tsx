import React from 'react'
import dynamic from "next/dynamic";

const ComponentsMap = {
    'page_heading_section_block': 'Heading',
    'content_section_block': 'Content',
    'pricing_section_block': 'Pricing',
    'contact_section_block': 'Contact',
    'service_section_block': 'Services',
    'cta_section_block': 'Cta',
    'text_with_image_section_block': 'TextWithImage',
    'hero_with_search_bar': 'HeroWithSearchBar',
    'topic_slider': 'TopicSlider',
    'product_slider': 'ProductSlider',
    'testimonial_slider': 'TestimonialSlider',
}

const DynamicComponent = (props) => {
    const {section, ...rest} = props;
    if (typeof ComponentsMap[section.type] !== 'undefined') {
        const Component = dynamic(
            () => import(`./${ComponentsMap[section.type]}`),
            {ssr: true}
        )
        return (
            <Component
                {...section.value}
                {...rest}
            />
        )
    }

    // fallback if the component doesn't exist
    return (<p>The component <strong>{section.type}</strong> has not been created yet.</p>)
}

export default DynamicComponent