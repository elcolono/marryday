import React from "react"

import { Container, FormGroup, Label } from "reactstrap"

import ProgressBar from "../../components/ProgressBar"
import ListingForm from "../..//components/ListingForm"
import data from "../../api/mock/user-add.json"
import { Form, Formik, useFormikContext } from "formik"
import { InputField } from "../../components/FormFields"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Add your listing",
      listingForm: true,
    },
  }
}

const UserAdd1 = () => {
  const formikContext = useFormikContext();
  console.log(formikContext);

  return (
    <React.Fragment>
      <ProgressBar progress={20} />
      <section className="py-5">
        <Container>
          <p className="subtitle text-primary">{data[1].subtitle}</p>
          <h1 className="h2 mb-5">
            {data[1].title}
            <span className="text-muted float-right">Step 1</span>
          </h1>

          <Formik 
            initialValues={{
              title: "",
              Description: ""
            }}
            onSubmit={() => {}}
            >{({
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="title" className="form-label">
                    Title
                  </Label>
                  <InputField
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Cooler Trailer"
                    required
                  />
                </FormGroup>
              </Form>
            )}</Formik>
        
          <ListingForm data={data[1]} nextStep="/products/add-2" />
        </Container>
      </section>
    </React.Fragment>
  )
}

export default UserAdd1
