import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import User from "./views/dashboard/User.vue";
import Register from "./views/Register.vue";
import Position from "./views/Position.vue";
import Polygon from "./views/Polygon.vue";


// mode: 'history',
// linkActiveClass: 'active',
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },

  {
    path: "/user/:id",
    name: "user",
    component: User,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn &&
        parseInt(store.state.user.id) === parseInt(to.params.id)
      ) {
        next();
      } else {
        next({
          name: "login",
        });
      }
    }, 
   
  // },
  // {
  //   path: "/admin",
  //   name: "admin",
  //   component: Admin,
  //   meta: { requiresAuth: true },
  //   children: [
  //     {
  //       path: "add",
  //       component: Add,
  //     },
  //     {
  //       path: "/",
  //       component: AdminHome,
  //     },
  //   ],
  //   beforeEnter(to, from, next) {
  //     if (store.getters["isAdmin"]) {
  //       next();
  //     } else {
  //       next({
  //         name: "login",
  //       });
  //     }
  //   },
  },
  {
    path: "/position",
    name: "position",
    component: Position,
    meta: { requiresAuth: true },
    },  {
    path: "/polygon",
    name: "polygon",
    component: Polygon,
    meta: { requiresAuth: true },
    },
];

const router = createRouter({ history: createWebHistory(), routes });

// });

router.beforeEach((to, from, next) => {
  debugger;
  to.matched.some((record) => {
    console.log(record);
    return record.meta.requiresAuth;
  });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;