import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { VrstePlacanjaView } from 'src/sections/user/view/vrste-placanja-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <VrstePlacanjaView />
    </>
  );
}
