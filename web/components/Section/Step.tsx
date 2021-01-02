import React from "react"
import { Container, Row, Col } from "reactstrap"


const StepSection = () => {
    const numberedBlocks = [
        {
            "title": "Travel",
            "content": "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his"
        },
        {
            "title": "Relax",
            "content": "The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size."
        },
        {
            "title": "Explore",
            "content": "His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samp."
        }
    ]

    return (
        <section className="py-6">
            <Container>
                <Row>
                    {numberedBlocks.map((block, index) => (
                        <Col lg="4" className="px-5" key={index}>
                            <p className="advantage-number">{index + 1}</p>
                            <div className="pl-lg-5">
                                <h6 className="text-uppercase">{block.title}</h6>
                                <p className="text-muted text-sm mb-5 mb-lg-0">
                                    {block.content}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default StepSection;