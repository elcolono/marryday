import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      {/* <!-- Meta Tag --> */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- Favicon --> */}
      <link href="assets/images/logos/favicon.png" rel="icon"></link>

      {/* IOS Touch Icons */}
      <link rel="apple-touch-icon" href="assets/images/logos/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="assets/images/logos/touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="assets/images/logos/touch-icon-iphone-retina.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="assets/images/logos/touch-icon-ipad-retina.png" />

      {/* Styles */}
      <link rel="stylesheet" href="assets/css/vendors.bundle.css" type="text/css" />
      <link rel="stylesheet" href="assets/css/styles.bundle.css" type="text/css" />

      {/* Google fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
    </Head>
  )
}
