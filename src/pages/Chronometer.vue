<template>
  <base-dialog :isOpen="isDialogOpen" @close="toggleDialog">
    <base-form submitDescription="Add" :submitHandler="toggleDialog">
      <template v-slot:form-header>
        <h2>Add timer description</h2>
      </template>
      <template v-slot:form-inputs>
        <base-input
          v-for="input in inputs"
          :key="input.id"
          :id="input.id"
          :label="input.label"
          :type="input.type"
          :placeholder="input.placeholder"
          :value="input.value"
          :isValid="input.isValid"
          @change-handler="changeHandler"
        />
      </template>
      <template v-slot:form-aditional-action>
        <base-button @click="toggleDialog" type="button" mode="danger"
          >Cancel</base-button
        >
      </template>
    </base-form>
  </base-dialog>
  <section class="section">
    <base-card>
      <div class="chronometer__container">
        <h3 v-if="getInputValue" class="chronometer__description">
          {{ getInputValue }}
        </h3>
        <span class="chronometer__time">{{ formatChronometer }}</span>
        <div class="chronometer__actions">
          <base-button
            type="button"
            :clickHandler="
              status === 'paused' ? addDescription : pauseChronometer
            "
            mode="primary"
            >{{ status === "paused" ? "Start" : "Pause" }}</base-button
          >
          <base-button
            type="button"
            :clickHandler="addChronometer"
            mode="secondary"
            >Save</base-button
          >
          <base-button
            type="button"
            :clickHandler="stopChronometer"
            mode="danger"
            >Stop</base-button
          >
        </div>
      </div>
    </base-card>
    <div class="spinner" v-if="isLoading">
      <base-spinner />
    </div>
    <p class="chronometers__empty" v-else-if="!isLoading && !hasChronometers">
      You have no contacts yet, start adding them.
    </p>
    <ul class="chronometer__menu" v-else>
      <chronometer-item
        v-for="chronometer in chronometerList"
        :key="chronometer.id"
        :id="chronometer.id"
        :time="convertChronometerFormat(chronometer.time)"
        :description="chronometer.description"
        :selectedId="selectedChronometer"
        @select-chronometer="selectChronometer"
        @stop-chronometer="stopChronometer"
      >
      </chronometer-item>
    </ul>
  </section>
</template>

<script>
import ChronometerItem from "../components/ChronometerItem";
import Inputs from "../helpers/Inputs";
import { chronometerInputs } from "../constants/inputs";

export default {
  components: {
    "chronometer-item": ChronometerItem,
  },
  inject: ["errorHandler"],
  data() {
    return {
      isLoading: false,
      selectedChronometer: null,
      secs: 0,
      timer: null,
      status: "paused",
      isDialogOpen: false,
      isUpdating: false,
      inputsData: new Inputs(chronometerInputs),
    };
  },
  watch: {
    isDialogOpen() {
      if (!this.isDialogOpen) {
        this.startChronometer();
      }
    },
  },
  methods: {
    addDescription() {
      if (!this.selectedChronometer && this.secs === 0) {
        this.toggleDialog();
        return;
      }
      this.startChronometer();
    },
    startChronometer() {
      if (this.status === "started") return;

      this.status = "started";
      this.timer = setInterval(() => {
        this.secs++;
      }, 1000);
    },
    pauseChronometer() {
      this.status = "paused";
      clearInterval(this.timer);
    },
    stopChronometer() {
      clearInterval(this.timer);
      this.status = "paused";
      this.secs = 0;
      this.selectedChronometer = null;
      this.inputsData.clearValues();
      this.isUpdating = false;
    },
    addZero(val) {
      return val > 9 ? val : `0${val}`;
    },
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen;
    },
    changeHandler(target) {
      this.inputsData.changeHandler(target);
    },
    async fetchChronometers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("chronometers/getChronometers");
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
      this.isLoading = false;
    },
    convertChronometerFormat(time) {
      const hours = Math.floor(time / 3600);
      const mins = Math.floor((time - hours * 3600) / 60);
      const secs = Math.floor(time - hours * 3600 - mins * 60);

      return `${this.addZero(hours)}:${this.addZero(mins)}:${this.addZero(
        secs
      )}`;
    },
    selectChronometer(id) {
      clearInterval(this.timer);
      const chronometerData = this.$store.getters[
        "chronometers/getChronometer"
      ](id);

      this.selectedChronometer = id;
      this.secs = chronometerData.time;
      this.inputsData.setInputsData(chronometerData);
      this.isUpdating = true;
      this.status = "paused";
    },
    async addChronometer() {
      try {
        const chronometerData = {
          time: this.secs,
          description: this.inputsData.getInputValue("description"),
        };

        this.$store.dispatch("chronometers/storeUpdateChronometer", {
          chronometerData,
          isUpdating: this.isUpdating,
          id: this.selectedChronometer,
        });
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
  },
  computed: {
    formatChronometer() {
      const formatedTime = this.convertChronometerFormat(this.secs);
      return formatedTime;
    },
    chronometerList() {
      const chronometers = this.$store.getters["chronometers/getChronometers"];
      return chronometers;
    },
    inputs() {
      return this.inputsData.inputs;
    },
    getInputValue() {
      return this.inputsData.getInputValue("description");
    },
    hasChronometers() {
      return this.$store.getters["chronometers/hasChronometers"];
    },
  },
  created() {
    if (this.hasChronometers) return;
    this.fetchChronometers();
  },
};
</script>

<style scoped>
.chronometer {
  padding: 24px 0;
}

.section > *:not(:last-child) {
  margin-bottom: 16px;
}

.spinner {
  display: flex;
  justify-content: center;
}

.chronometer__container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chronometer__description {
  margin-bottom: 16px;
}

.chronometer__time {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.chronometer__actions > *:not(:last-child) {
  margin-right: 16px;
}

.chronometer__menu {
  display: grid;
}

.chronometer__menu > *:not(:last-child) {
  margin-bottom: 1rem;
}

.chronometers__empty {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .chronometer__menu {
    margin-top: 24px;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .chronometer__menu > *:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
