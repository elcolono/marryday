export default function FAQSection({ data }) {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-lg-11 mx-auto">
                        <div className="collapses" id="faqs">
                            {data && data.faqs.map((faq, i) => (
                                <div key={i} className="collapse-content">
                                    <div className="collapse-header" id={`collapse_heading-${i}`}>
                                        <h5 className="collapse-header-title">
                                            <a href="javascript:void(0);" data-toggle="collapse" data-target={`#collapse-${i}`} aria-expanded="true" aria-controls={`collapse-${i}`}>
                                                {faq.heading}
                                            </a>
                                        </h5>
                                    </div>
                                    <div id={`collapse-${i}`} className={`collapse ${i == 0 ? "show" : null}`} aria-labelledby={`collapse_heading-${i}`} data-parent="#faqs">
                                        <div className="collapse-body">
                                            {faq.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
