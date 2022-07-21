<template>
    <Modal :title="'You haven\'t gotten an invitation to The Frabric yet?'" :closeModal="closeModal">
        <div class="no-invite-modal-container is-justify-content-space-between is-flex">
            <div class="is-flex-direction-column submission-section">
                <p>Get access to The Frabric today, by subscribing to our waitlist.</p>
                <div class="is-flex is-flex-direction-column submission-container">
                    <input type="email" name="modalEmail" id="modalEmail" autocomplete="email" v-model="input.modalEmail" class="ring-1 ring-[#5A50D8] rounded-md py-3 px-4 bg-[#2F2C38]" :placeholder="input.modalEmailPlaceholder"/>
                    <Button :label="'Submit'" @click="onClickSubmit" extraClasses="py-5 px-6"></Button>
                </div>
            </div>
            <div class="is-flex cards-container">
                <div class="white-card israel-card">
                    <img src="../../../assets/pics/man-israel.png" alt="man's face">
                    <div>
                        <h4>Israel R.</h4>
                        <p>34 Invites</p>
                    </div>
                </div>
                <div class="white-card nikole-card">
                    <img src="../../../assets/pics/woman-nikole.png" alt="woman's face">
                    <div>
                        <h4>Nikole K.</h4>
                        <p>2k Invites</p>
                    </div>
                </div>
                <img class="face-icon man-icon" src="../../../assets/pics/nameless-man-1.png" alt="man's face">
                <img class="face-icon woman-icon" src="../../../assets/pics/nameless-woman-1.png" alt="man's face">
                <div class="icon-container nodes">
                    <img src="../../../assets/pics/nodes.svg" alt="Nodes decoration"/>
                </div>
                <div class="icon-container chart">
                    <img src="../../../assets/pics/barchart.svg" alt="Nodes decoration"/>
                </div>
                <div class="icon-container arrow">
                    <img src="../../../assets/pics/yellow-arrow.svg" alt="Nodes decoration"/>
                </div>                                
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from "../common/Modal.vue";
import Button from "../common/Button.vue";
import { subscribe } from "../../../services/email";

export default {
  name: "NoInviteModal",
  components: {
    Modal,
    Button,
  },
  data() {
    return {
      input: {
        modalEmail: "",
        modalEmailPlaceholder: "Email address",
      },
    }
  },
  methods: {
    onClickSubmit() {
      if (!this.input.modalEmail || !this.isValidEmail(this.input.modalEmail)) {
        this.input.modalEmailPlaceholder = "Valid email required"
        this.input.modalEmail = ""
        return
      }

      subscribe(this.input.modalEmail)
        .then(error => {
          if (error == null) {
            this.input.emailPlaceholder = "Enter your email"
            this.input.email = ""
          }
        })
    },
    isValidEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/frabric-custom.scss";
@import "../../../styles/_variables.sass";

.no-invite-modal-container {
    margin-top: 50px;

    @include until(880px) {
        flex-direction: column;
    }
}

.submission-container {
    gap: 40px;
}

.submit-button {
    height: 1000px;
}

.submission-section {

    display: flex;
    flex-direction: column;
    gap: 40px;

    p {
        color: white;
        font-size: 18px;
        max-width: 28ch;
    }

    input {
        border: 1px solid $mediumBlue;
        border-radius: 10px;
        height: 50px;
        font-size: 18px;
        background: #2F2C38;
        color: $mediumGray;
        min-width: 350px;
    }
}

.cards-container {
    position: relative;
    width: 400px;
    height: 270px;
}

.white-card {
    position: absolute;
    background: white;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 15px;
    width: 260px;
    height: 110px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    img {
        height: 80px;
        width: 80px;
        border: 1px solid $mediumBlue;
        padding: 5px;
        border-radius: 100%;
        margin-right: 21px;
    }

    h4 {
        font-size: 22px;
        font-weight: 500;
        color: $mediumBlue;
    }

    p {
        color: $mediumGray;
        font-size: 12px;
        font-weight: 600;
    }
}

.israel-card {
    top: 30px;
    right: 40px;
    z-index: 3;
}

.nikole-card {
    top: 120px;
    left: 20px;
}

.face-icon {
    position: absolute;
    height: 50px;
    width: 50px;
    border: 1px solid $lightBlue;
    border-radius: 100%;
    padding: 2px;
}

.woman-icon {
    border-color: white;
    left: 350px;
}

.man-icon {
    top: 210px;
    left: 0px;
}

.icon-container {
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 25px;
    }
}

.arrow {
    top: 50px;
    left: 20px;
    background: linear-gradient(346.37deg, #FEB400 7.8%, #FFDC85 120.29%);
}

.chart {
    top: 200px;
    left: 295px;
    background: #FF0000;

    img {
        width: 18px;
    }
}

.nodes {
    top: 160px;
    left: 350px;
    background: linear-gradient(346.37deg, #000044 7.8%, #1D1DB3 120.29%);
}

</style>