import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StanjeRobeView } from 'src/sections/product/view/stanje-robe-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <StanjeRobeView />
    </>
  );
}
