import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Stolovi',
    path: '/stolovi',
    icon: icon('ic-user'),
  },
  {
    title: 'Racuni',
    path: '/racuni',
    icon: icon('ic-cart'),
  },
  {
    title: 'Prodaja artikala',
    path: '/prodajaArtikala',
    icon: icon('ic-blog'),
  },
  {
    title: 'Prodaja po operaterima',
    path: '/prodajaPoOperaterima',
    icon: icon('ic-blog'),
  },
  {
    title: 'Porezi',
    path: '/porezi',
    icon: icon('ic-blog'),
  },
  {
    title: 'Porezi po grupama',
    path: '/poreziPoGrupama',
    icon: icon('ic-blog'),
  },
  {
    title: 'Utrosena roba',
    path: '/utrosenaRoba',
    icon: icon('ic-blog'),
  },
  {
    title: 'Vrste placanja',
    path: '/vrstePlacanja',
    icon: icon('ic-blog'),
  },
  {
    title: 'Prodaja artikala po operaterima',
    path: '/prodajaArtikalaPoOperaterima',
    icon: icon('ic-blog'),
  },
  {
    title: 'Stanje robe',
    path: '/stanjeRobe',
    icon: icon('ic-blog'),
  },
  {
    title: 'Promet po kupcima',
    path: '/prometPoKupcima',
    icon: icon('ic-blog'),
  },
  {
    title: 'Oslobodjeno poreza',
    path: '/oslobodjenoPoreza',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
