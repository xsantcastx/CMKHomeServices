import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { siteConfig } from '@config/site-config';

const siteTitle = siteConfig.seo?.siteName || siteConfig.brand.shortName || siteConfig.brand.name;
const routeTitle = (key: string) => `${siteTitle} | ${key}`;
const maintenanceTitle = `${siteConfig.maintenance?.title || 'Site Maintenance'} - ${siteTitle}`;

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePageComponent),
    title: routeTitle('page_titles.home')
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
    title: 'About Us - CMK Home Services | Miami'
  },
  {
    path: 'service-areas',
    loadComponent: () => import('./pages/service-areas/service-areas.page').then(m => m.ServiceAreasPage),
    title: 'Service Areas in Miami | CMK Home Services'
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPageComponent),
    title: routeTitle('page_titles.products')
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./pages/productos/detalle/detalle.component').then(m => m.DetalleComponent),
    title: routeTitle('page_titles.product_details')
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria/galeria.page').then(m => m.GaleriaPageComponent),
    title: routeTitle('page_titles.gallery')
  },
  {
    path: 'gallery',
    redirectTo: 'galeria',
    pathMatch: 'full'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then(m => m.ContactoPageComponent),
    title: routeTitle('page_titles.contact')
  },
  {
    path: 'contact',
    redirectTo: 'contacto',
    pathMatch: 'full'
  },
  // Service Pages - Unified
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage),
    title: 'Our Cleaning Services in Miami | CMK Home Services'
  },
  {
    path: 'services/:serviceId',
    loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage),
    title: 'Cleaning Services in Miami | CMK Home Services'
  },
  {
    path: 'residential-cleaning',
    redirectTo: 'services/residential',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    redirectTo: '404'
  },
  // Checkout Routes
  {
    path: 'checkout/review',
    redirectTo: '404'
  },
  {
    path: 'checkout/payment',
    redirectTo: '404'
  },
  {
    path: 'checkout/confirmation',
    redirectTo: '404'
  },
  // Client Area Routes
  {
    path: 'client/login',
    loadComponent: () => import('./pages/client/login/login.page').then(m => m.LoginPageComponent),
    title: routeTitle('page_titles.login')
  },
  {
    path: 'client/register',
    loadComponent: () => import('./pages/client/register/register.page').then(m => m.RegisterPageComponent),
    title: routeTitle('page_titles.register')
  },
  {
    path: 'client/profile',
    loadComponent: () => import('./pages/client/profile/profile.page').then(m => m.ProfilePageComponent),
    canActivate: [authGuard],
    title: routeTitle('page_titles.profile')
  },
  {
    path: 'client/orders',
    loadComponent: () => import('./pages/client/orders/orders.page').then(m => m.OrdersPageComponent),
    canActivate: [authGuard],
    title: routeTitle('page_titles.orders')
  },
  // Admin Panel Routes
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.page').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.admin_dashboard')
  },
  {
    path: 'admin/products',
    loadComponent: () => import('./pages/admin/products/products-admin.page').then(m => m.ProductsAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.product_management')
  },
  {
    path: 'admin/products/quick-add',
    loadComponent: () => import('./pages/admin/products/quick-add-product.page').then(m => m.QuickAddProductComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.quick_add_product')
  },
  {
    path: 'admin/gallery',
    loadComponent: () => import('./pages/admin/gallery/gallery-admin.page').then(m => m.GalleryAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.gallery_management')
  },
  {
    path: 'admin/orders',
    loadComponent: () => import('./pages/admin/orders/orders-admin.page').then(m => m.OrdersAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.order_management')
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./pages/admin/users/users-admin.page').then(m => m.UsersAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.user_management')
  },
  {
    path: 'admin/benefit-templates',
    loadComponent: () => import('./pages/admin/benefit-templates/benefit-templates-admin.page').then(m => m.BenefitTemplatesAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.benefit_templates')
  },
  {
    path: 'admin/analytics',
    loadComponent: () => import('./pages/admin/analytics/analytics-admin.page').then(m => m.AnalyticsAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.analytics')
  },
  {
    path: 'admin/settings',
    loadComponent: () => import('./pages/admin/settings/settings-admin.page').then(m => m.SettingsAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.settings')
  },
  {
    path: 'admin/email-templates',
    loadComponent: () => import('./pages/admin/email-templates/email-templates-admin.page').then(m => m.EmailTemplatesAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.email_templates')
  },
  {
    path: 'admin/size-groups',
    loadComponent: () => import('./pages/admin/size-groups/size-groups-admin.page').then(m => m.SizeGroupsAdminComponent),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.size_groups')
  },
  {
    path: 'admin/reviews',
    loadComponent: () => import('./pages/admin/reviews/reviews.page').then(m => m.AdminReviewsPage),
    canActivate: [adminGuard],
    title: routeTitle('page_titles.reviews')
  },
  {
    path: 'admin/sitemap',
    loadComponent: () => import('./pages/admin/sitemap/sitemap.page').then(m => m.AdminSitemapPage),
    canActivate: [adminGuard],
    title: routeTitle('Sitemap Generator')
  },
  {
    path: 'maintenance',
    loadComponent: () => import('./pages/maintenance/maintenance.page').then(m => m.MaintenancePage),
    title: maintenanceTitle
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPageComponent),
    title: routeTitle('page_titles.not_found')
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
