import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PrometPoKupcimaView } from 'src/sections/overview/view/promet-po-kupcima-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <PrometPoKupcimaView />
    </>
  );
}
