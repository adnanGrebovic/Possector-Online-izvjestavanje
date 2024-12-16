import { Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { CONFIG } from 'src/config-global';
import data from 'src/data/ConfigureData';
import  RacuniView  from 'src/sections/product/view/racuni-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
    <Provider store={data}>

      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <RacuniView />
    </Provider>
    </>
  );
}
