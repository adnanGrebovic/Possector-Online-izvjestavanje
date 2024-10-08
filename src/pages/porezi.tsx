import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PoreziView } from 'src/sections/user/view/porezi-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <PoreziView />
    </>
  );
}
