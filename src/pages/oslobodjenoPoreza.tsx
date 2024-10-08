import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OslobodjenoPorezaView } from 'src/sections/overview/view/oslobodjeno-poreza-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <OslobodjenoPorezaView />
    </>
  );
}
