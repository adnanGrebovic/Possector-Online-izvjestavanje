import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProdajaArtikalaPoOperaterimaView } from 'src/sections/overview/view/prodaja-artikala-po-operaterima-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProdajaArtikalaPoOperaterimaView />
    </>
  );
}
