<template>
  <div>
    <NoInviteModal v-if="isNoInviteModalOpen" @closeModal="isNoInviteModalOpen = false"/>
    <button @click="isNoInviteModalOpen = true">OPEN MODAL</button>
    <HeaderNavigationBar />
    <main class="mt-6 mb-6">
      <div class="container mt-3 mb-3">
        <RouterView class="container p-5" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderNavigationBar from "./layout/navigation/HeaderNavigationBar.vue";
import NoInviteModal from "./views/modals/NoInviteModal.vue";

export default {
  name: "AppBody",
  components: {
    HeaderNavigationBar,
    NoInviteModal,
  },
  data() {
    return {
      isNoInviteModalOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      alert: "activeAlert",
    }),
  },
};
</script>