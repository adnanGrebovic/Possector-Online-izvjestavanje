import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UtrosenaRobaView } from 'src/sections/overview/view/utrosena-roba-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UtrosenaRobaView />
    </>
  );
}
