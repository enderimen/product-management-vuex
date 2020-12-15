<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Çıkışı</h3>
          <hr />
          <div class="form-group">
            <label>Ürün Adı</label>
            <select
              class="form-control"
              v-model="selectedProduct"
              @change="getSelectedProduct"
            >
              <option value="Bir ürün seçiniz" disabled>
                Bir ürün seçiniz
              </option>
              <option
                :value="product.key"
                v-for="product in getProducts"
                :key="product.id"
                :disabled="product.count == 0"
              >
                {{ product.title }} {{ product.count == 0 ? "- Tükendi" : "" }}
              </option>
            </select>
          </div>
          <transition name="fade" mode="out-in">
            <div class="card mb-2 border border-danger" v-if="product != null">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 text-center">
                    <div class="mb-3">
                      <span class="badge badge-info mr-2"
                        >Stok: {{ product.count }}</span
                      >
                      <span class="badge badge-primary"
                        >Fiyat : {{ product.price | currency }}</span
                      >
                    </div>
                    <p class="border border-warning p-2 text-secondary">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="form-group">
            <label>Adet</label>
            <input
              type="number"
              class="form-control"
              placeholder="Ürün adetini giriniz.."
              min="1"
              :max="getProductCount"
              v-model="productCount"
            />
          </div>
          <hr />
          <button
            class="btn btn-primary"
            @click="save()"
            :disabled="saveEnabled"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedProduct: null,
      product: null,
      productCount: null,
      saveButtonClicked: false,
    };
  },
  computed: {
    ...mapGetters(["getProducts"]),
    getProductCount() {
      return this.product != null ? this.product.count : 1;
    },
    saveEnabled() {
      if (this.selectedProduct != "" && this.productCount > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    getSelectedProduct() {
      this.product = this.$store.getters.getProduct(this.selectedProduct)[0];
    },
    save() {
      let product = {
        key: this.selectedProduct,
        count: this.productCount,
      };

      this.$store.dispatch("sellProduct", product);
      this.saveButtonClicked = true;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (
      (this.productCount > 0 || this.selectedProduct !== null) &&
      !this.saveButtonClicked
    ) {
      if (
        confirm(
          "Kaydedilmemiş değişiklikler var. Yine de çıkmak istiyor musunuz?"
        )
      ) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>

<style scoped></style>
