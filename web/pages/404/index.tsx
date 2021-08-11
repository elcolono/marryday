import React from "react"
import Link from "next/link"

import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';
import { GetStaticProps } from 'next';

import {
  Container,
  Button,
} from "reactstrap"
import Image from "../../components/CustomImage"

export default function Page404(pageProps) {

  const { page } = pageProps;
  return (
    <>
      {page ?
        <div className="mh-full-screen d-flex align-items-center dark-overlay">
          <Image
            src={page.image.meta.download_url}
            alt="Not found"
            className="bg-image"
            loading="eager"
            layout="fill"
            priority={true}
          />
          <Container className="text-white text-lg overlay-content py-6 py-lg-0">
            <h1 className="display-3 font-weight-bold mb-5">
              {page.heading}
            </h1>
            <p className="font-weight-light mb-5">
              {page.description}{" "}
            </p>
            <p className="mb-6">
              <Link href="/">
                <Button href="/" color="outline-light">
                  <i className="fa fa-home mr-2" />
                  {page.button_text}
                </Button>
              </Link>
            </p>
            <p className="h4 text-shadow">Error 404</p>
          </Container>
        </div> :
        <div>Keine Daten</div>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settings = await fetchAPIwithSSR('/api/page/home', { method: 'GET' });
  const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=home.Page404&fields=seo_title,search_description,heading,description,image,button_text', { method: 'GET' });
  const page = pageData?.items[0] ?? null;

  return {
    revalidate: 1,
    props: {
      page: page,
      themeSettings: settings?.theme_settings ?? null,
      mainMenus: settings?.main_menus ?? null,
      flatMenus: settings?.flat_menus ?? null,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: page?.meta.seo_title ?? null,
      searchDescription: page?.meta.search_description ?? null,
    },
  }
}
