import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        // name: "Home",
        // component: Home,
        redirect: "login"
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login/index.vue")
    },
];

const router = new VueRouter({
    routes
});

export default router;
