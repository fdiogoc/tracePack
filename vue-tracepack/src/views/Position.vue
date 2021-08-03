<template>
  <div
    class="
      flex flex-col
       max-w-xl
      px-4
      py-8
      bg-white
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
                  <h5 class="authBtn">Nova posição</h5>

                  <hr />
                </div>

                <form @submit.prevent="create">
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
                        focus:ring-2 focus:ring-green-600
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
                      type="text"
                      v-model="color"
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
                        focus:ring-2 focus:ring-green-600
                        focus:border-transparent
                      "
                      placeholder="Cor"
                      name="color"
                    />

                    <input
                      v-model="color"
                      type="color"
                      class="
                        form-control
                        rounded-lg
                        border border-gray-300
                        w-full
                      "
                    />
                  </div>
                  <div class="form-group flex flex-col mb-2">
                    <textarea
                      rows="15"
                      v-model="json"
                      class="
                        form-control
                        rounded-lg
                        border-transparent
                        flex-1
                        appearance-none
                        border border-gray-300
                        bg-white
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        text-base
                        focus:outline-none
                        focus:ring-2 focus:ring-green-600
                        focus:border-transparent
                      "
                      placeholder="GeoJSON"
                      name="json"
                    ></textarea>

                    <span class="text-danger">
                      {{ jsonError }}
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
                    Criar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const schema = object({
      name: string().required(),
      json: string().required().min(8),
      color: string(),
    });
    useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields
    const { value: json, errorMessage: jsonError } = useField("json");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: color } = useField("color");
    const create = async () => {
      try {
        await store.dispatch("createPosition", {
          color: color.value,
          geoJson: json.value,
          name: name.value,
        });

        return router.push({
          name: "map",
        });
      } catch (err) {
        console.log(err);
      }
    };

    return {
      nameError,
      name,
      json,
      jsonError,
      create,
      color,
    };
  },
};
</script>