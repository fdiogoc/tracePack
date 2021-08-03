<template>
  <div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 justify-center mx-auto mt-20">
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-custom p-5">
            <div class="container p-5">
              <div class="pb-5">
      <div class="text-center pb-3">
                  <h5 class="authBtn">Login</h5>
           
                  <hr />
                </div>
                <form @submit.prevent="login">
                      <div class="form-group flex flex-col mb-2">
                    <input
                      name="email"
                      type="email"
                      v-model="email"
                     class="form-control rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                       placeholder="Email"
                    />
                    <span class="text-danger">
                      {{ emailError }}
                    </span>
                  </div>
                 <div class="form-group flex flex-col mb-2">
                    <input
                      name="password"
                      type="password"
                      v-model="password"
                      class="form-control rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                       placeholder="Password"
                    />
                    <span class="text-danger">
                      {{ passwordError }}
                    </span>
                  </div>
                  <button
                    type="submit"
                 class="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login
                  </button>
                </form>
              </div>
              <p>
                Não possui conta?
                <router-link to="/register"  class="text-sm text-green-500 underline hover:text-green-700"  >Registrar</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const schema = object({
      email: string().required().email(),
      password: string().required().min(8),
    });
    useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } = useField(
      "password"
    );
    const user = ref({});
    const login = async () => {
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        
          return router.push({
            name: "user",
            params: { id: store.state.user.id },
          });
      } catch (err) {
        console.log(err);
      }
    };
    return {
      login,
      user,
      emailError,
      passwordError,
      email,
      password,
    };
  },
};
</script>