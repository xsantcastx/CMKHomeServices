import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICE_IDS } from './pages/services/services.constants';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'services/:serviceId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SERVICE_IDS.map(serviceId => ({ serviceId }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
