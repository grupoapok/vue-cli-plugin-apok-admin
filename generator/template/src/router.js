import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import constants from "@/config/constants";

const requireRoutes = require.context("@/features", true, /routes\.js$/);
const childRoutes = [];

requireRoutes.keys().forEach(fileName => {
    if (fileName.indexOf("routes.js") !== -1) {
        childRoutes.push({ ...requireRoutes(fileName).default });
    }
});

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: "/",
            name: "Home",
            redirect: { name: "Dashboard" }
        },
        {
            path: "/auth/login",
            name: "Login",
            component: () => import(/* webpackChunkName: "login" */ "./views/Login")
        },
        {
            path: "/admin",
            component: () => import(/* webpackChunkName: "admin-layout" */ "@apok/admin-components-%FRAMEWORK%/components/AdminLayout" ),
            meta: { requiresAuth: true },
            children: [
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: () => import(/* webpackChunkName: "dashboard" */ "./views/Dashboard")
                },
                ...childRoutes,
                {
                    path: "*",
                    component: () => import(/* webpackChunkName: "not-found" */ "./views/NotFoundPage")
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: "*",
            component: () => import(/* webpackChunkName: "not-found" */ "./views/NotFoundPage")
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/admin")) {
        const token = Cookies.get(constants.SESSION_COOKIE);
        if (!token) {
            next({ name: "Login" });
        }
    }
    next();
});

export default router;
