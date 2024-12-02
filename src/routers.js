import HomePage from './components/HomePage.vue';
import SignUp from './components/SignUp.vue';
import LoginPage from './components/LoginPage.vue';
import AddRest from './components/AddRest.vue';
import UpdateRest from './components/UpdateRest.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/',
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login',
    },
    {
        name: 'AddRest',
        component: AddRest,
        path: '/add-restaurant',
    },
    {
        name: 'UpdateRest',
        component: UpdateRest,
        path: '/update-restaurant/:id',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userLoggedIn = localStorage.getItem('User-Info');

    if (userLoggedIn && (to.name === 'LoginPage' || to.name === 'SignUp')) {
        return next({ name: 'HomePage' });
    }

    next();
});

export default router;