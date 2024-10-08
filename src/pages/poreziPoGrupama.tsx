import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PoreziPoGrupamaView } from 'src/sections/user/view/porezi-po-grupama-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <PoreziPoGrupamaView />
    </>
  );
}
