<template>
  <div
    class="
      flex flex-col
      max-w-md
      px-4
      py-8
      bg-white
      rounded-lg
      shadow
      dark:bg-gray-800
      sm:px-6
      md:px-8
      lg:px-10
      justify-center
      mx-auto
      mt-20
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-custom p-5">
            <div class="container">
              <div class="pb-5">
                <div class="text-center pb-3">
                  <h5 class="authBtn">Registrar</h5>

                  <hr />
                </div>

                <form @submit.prevent="register">
                  <div class="form-group flex flex-col mb-2">
                    <input
                      type="text"
                      v-model="name"
                      class="
                        form-control
                        rounded-lg
                        border-transparent
                        flex-1
                        appearance-none
                        border border-gray-300
                        w-full
                        py-2
                        px-4
                        bg-white
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        text-base
                        focus:outline-none
                        focus:ring-2 focus:ring-purple-600
                        focus:border-transparent
                      "
                      placeholder="Name"
                      name="name"
                    />
                    <span class="text-danger">
                      {{ nameError }}
                    </span>
                  </div>
                  <div class="form-group flex flex-col mb-2">
                    <input
                      type="email"
                      v-model="email"
                      class="
                        form-control
                        rounded-lg
                        border-transparent
                        flex-1
                        appearance-none
                        border border-gray-300
                        w-full
                        py-2
                        px-4
                        bg-white
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        text-base
                        focus:outline-none
                        focus:ring-2 focus:ring-purple-600
                        focus:border-transparent
                      "
                      placeholder="Email"
                      name="email"
                    />
                    <span class="text-danger">
                      {{ emailError }}
                    </span>
                  </div>
                  <div class="form-group flex flex-col mb-2">
                    <input
                      type="password"
                      v-model="password"
                      class="
                        form-control
                        rounded-lg
                        border-transparent
                        flex-1
                        appearance-none
                        border border-gray-300
                        w-full
                        py-2
                        px-4
                        bg-white
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        text-base
                        focus:outline-none
                        focus:ring-2 focus:ring-purple-600
                        focus:border-transparent
                      "
                      placeholder="Password"
                      autocomplete="new-password"
                      name="password"
                    />
                    <span class="text-danger">
                      {{ passwordError }}
                    </span>
                  </div>
                  <div class="form-group flex flex-col mb-2">
                    <input
                      type="password"
                      v-model="password_confirmation"
                      class="
                        form-control
                        rounded-lg
                        border-transparent
                        flex-1
                        appearance-none
                        border border-gray-300
                        w-full
                        py-2
                        px-4
                        bg-white
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        text-base
                        focus:outline-none
                        focus:ring-2 focus:ring-purple-600
                        focus:border-transparent
                      "
                      placeholder="Confirm Password"
                      autocomplete="new-password"
                      name="password_confirmation"
                    />
                    <span class="text-danger">
                      {{ password_confirmationError }}
                    </span>
                  </div>

                  <button
                    type="submit"
                    class="
                      py-2
                      px-4
                      bg-green-600
                      hover:bg-green-700
                      focus:ring-green-500 focus:ring-offset-green-200
                      text-white
                      w-full
                      transition
                      ease-in
                      duration-200
                      text-center text-base
                      font-semibold
                      shadow-md
                      focus:outline-none
                      focus:ring-2 focus:ring-offset-2
                      rounded-lg
                    "
                  >
                    Resgistrar
                  </button>
                </form>
              </div>
              <p>
                Já possui conta?
                <router-link
                  class="text-sm text-green-500 underline hover:text-green-700"
                  to="/login"
                  >Login</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const schema = object({
      email: string().required().email(),
      password: string().required().min(8),
      password_confirmation: string().oneOf(
        [yupRef("password"), null],
        "Passwords must match"
      ),
      name: string().required(),
    });
    useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField("email");
    const {
      value: password_confirmation,
      errorMessage: password_confirmationError,
    } = useField("password_confirmation");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: name, errorMessage: nameError } = useField("name");
    const register = async () => {
      try {
        await store.dispatch("register", {
          email: email.value,
          password: password.value,
          name: name.value,
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
      register,
      emailError,
      email,
      nameError,
      name,
      passwordError,
      password,
      password_confirmationError,
      password_confirmation,
    };
  },
};
</script>