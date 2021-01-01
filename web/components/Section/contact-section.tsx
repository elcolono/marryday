export default function ContactSection({ data, title }) {
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-xl-6 col-lg-8 col-md-11">
                            <h2 className="section-title"><span>{data.heading}</span></h2>
                        </div> */}
                    </div>
                    <div className="row list-bunch text-center">
                        {data.contacts && data.contacts.map((contact, i) => (
                            <div key={i} className="col list-bunch-item">
                                <div className="icon m-auto">
                                    {contact.type == "email" && <i className="ion-md-mail"></i>}
                                    {contact.type == "phone" && <i className="ion-md-call"></i>}
                                </div>
                                <h4 className="mt-2 mb-2">{contact.heading}</h4>
                                {contact.type == "email" && <a href={`mailto:${contact.data}`}>{contact.data}</a>}
                                {contact.type == "phone" && <a href={`tel:${contact.data}`}>{contact.data}</a>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <div className="row flex-row-reverse">
                                <div className="col-lg-6">
                                    <h2 className="section-title"><span>Send your query by filling this form</span></h2>
                                    <form action="#" className="form-row">
                                        <div className="col-6 form-group">
                                            <input type="text" placeholder="Name" className="form-control" />
                                        </div>
                                        <div className="col-6 form-group">
                                            <input type="text" placeholder="Phone" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <input type="text" placeholder="Email" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <input type="text" placeholder="Subject" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <textarea name="msg" id="msg" cols="30" rows="7" className="form-control" placeholder="Message"></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button type="button" className="btn btn-block btn-danger">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5">
                                    <div id="map"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}