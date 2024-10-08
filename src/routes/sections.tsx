import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const ProdajaArtikalaPage = lazy(() => import('src/pages/prodajaArtikala'));
export const StoloviPage = lazy(() => import('src/pages/stolovi'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const RacuniPage = lazy(() => import('src/pages/racuni'));
export const ProdajaPoOperaterimaPage = lazy(() => import('src/pages/prodajaPoOperaterima'));
export const PoreziPage = lazy(() => import('src/pages/porezi'));
export const PoreziPoGrupamaPage = lazy(() => import('src/pages/poreziPoGrupama'));
export const UtrosenaRobaPage = lazy(() => import('src/pages/utrosenaRoba'));
export const VrstePlacanjaPage = lazy(() => import('src/pages/vrstePlacanja'));
export const ProdajaArtikalaPoOperaterimaPage = lazy(() => import('src/pages/prodajaArtikalaPoOperaterima'));
export const StanjeRobePage = lazy(() => import('src/pages/stanjeRobe'));
export const PrometPoKupcimaPage = lazy(() => import('src/pages/prometPoKupcima'));
export const OslobodjenoPorezaPage = lazy(() => import('src/pages/oslobodjenoPoreza'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'stolovi', element: <StoloviPage /> },
        { path: 'racuni', element: <RacuniPage /> },
        { path: 'prodajaArtikala', element: <ProdajaArtikalaPage /> },
        { path: 'prodajaPoOperaterima', element: <ProdajaPoOperaterimaPage /> },
        { path: 'porezi', element: <PoreziPage /> },
        { path: 'poreziPoGrupama', element: <PoreziPoGrupamaPage /> },
        { path: 'utrosenaRoba', element: <UtrosenaRobaPage /> },
        { path: 'vrstePlacanja', element: <VrstePlacanjaPage /> },
        { path: 'prodajaArtikalaPoOperaterima', element: <ProdajaArtikalaPoOperaterimaPage /> },
        { path: 'stanjeRobe', element: <StanjeRobePage /> },
        { path: 'prometPoKupcima', element: <PrometPoKupcimaPage /> },
        { path: 'oslobodjenoPoreza', element: <OslobodjenoPorezaPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
