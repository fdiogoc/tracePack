<template>

<nav class="flex bg-white flex-wrap items-center justify-between p-4">
    <div class="lg:order-2 w-auto lg:w-1/5 lg:text-center">
        <a class="text-xl text-gray-800 font-semibold font-heading" href="#">
            Charlie Rabiller
        </a>
    </div>
    <div class="block lg:hidden">
        <button class="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>
                    Menu
                </title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                </path>
            </svg>
        </button>
    </div>
    <div class="navbar-menu hidden lg:order-1 lg:block w-full lg:w-2/5">
        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
            Home
        </a>
        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
            Team
        </a>
        <a class="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600" href="#">
            Galery
        </a>
    </div>
    <div class="navbar-menu hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right">
        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
            Content
        </a>
        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
            FAQ
        </a>
        <a class="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600" href="#">
            Contact
        </a>
    </div>
</nav>

  <nav class="navbar navbar-light bg-light">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <router-link
          class="nav-link authBtn"
          id="pills-home-tab"
          data-toggle="pill"
          to="/"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
          >Home</router-link
        >
      </li>
      <li class="nav-item" v-if="loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to
          @click="redirect"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
          >Dashboard</router-link
        >
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-profile-tab"
          data-toggle="pill"
          to="/login"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          >Login</router-link
        >
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to="/register"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
          >Register</router-link
        >
      </li>

      <li class="nav-item" v-if="loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to
          @click="logout"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
          >Logout</router-link
        >
      </li>
    </ul>
    <form class="form-inline" v-if="!loggedIn">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  </nav>
</template>
<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const logout = async () => {
      await store.dispatch("logout");
    };
    return {
      loggedIn: store.state.loggedIn,
      logout,
    };
  },
};
</script>