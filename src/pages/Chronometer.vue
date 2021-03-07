<template>
  <base-dialog :isOpen="isDialogOpen" @close="toggleDialog">
    <base-form submitDescription="Add" :submitHandler="toggleDialog">
      <template v-slot:form-header>
        <h2>Add timer description</h2>
      </template>
      <template v-slot:form-inputs>
        <base-input
          v-for="(input, name) in inputs"
          :key="name"
          :id="name"
          :type="input.type"
          :placeholder="input.placeholder"
          :value="input.type === 'file' ? input.showValue : input.value"
          @file-change-handler="fileChangeHandler"
        />
      </template>
      <template v-slot:form-aditional-action>
        <base-button @click="toggleDialog" type="button" mode="unstyled"
          >Cancel</base-button
        >
      </template>
    </base-form>
  </base-dialog>
  <section class="chronometer">
    <base-card>
      <div class="chronometer__container">
        <h2 v-if="inputs.description.value">{{ inputs.description.value }}</h2>
        <span class="chronometer__time">{{ formatChronometer }}</span>
        <div class="chronometer__actions">
          <button @click="startChronometer">Start</button>
          <button @click="pauseChronometer">Pause</button>
          <button @click="stopChronometer">Stop</button>
        </div>
      </div>
    </base-card>
    <ul class="chronometer__menu">
      <chronometer-item
        v-for="chronometer in chronometerList"
        :key="chronometer.id"
        :id="chronometer.id"
        :time="convertChronometerFormat(chronometer.time)"
        :description="chronometer.description"
        @selectChronometer="selectChronometer"
      >
      </chronometer-item>
    </ul>
  </section>
</template>

<script>
import ChronometerItem from "../components/ChronometerItem";

export default {
  components: {
    "chronometer-item": ChronometerItem,
  },
  data() {
    return {
      selectedChronometer: null,
      secs: 0,
      timer: null,
      status: "paused",
      isDialogOpen: false,
      isUpdating: false,
      inputs: {
        description: {
          type: "text",
          value: "",
          placeholder: "Timer description",
          isValid: true,
        },
      },
    };
  },
  methods: {
    startChronometer() {
      if (this.status === "started") return;

      if (!this.selectedChronometer) {
        this.toggleDialog();
      }

      this.status = "started";
      this.timer = setInterval(() => {
        this.secs++;
      }, 1000);
    },
    pauseChronometer() {
      this.status = "paused";
      this.addChronometer();
      this.stopChronometer();
    },
    stopChronometer() {
      clearInterval(this.timer);
      this.secs = 0;
      this.selectedChronometer = null;
      this.inputs.description.value = "";
      this.isUpdating = false;
    },
    addZero(val) {
      return val > 9 ? val : `0${val}`;
    },
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen;
    },
    fileChangeHandler(target) {
      this.inputs.description.value = target.value;
    },
    fetchChronometers() {
      this.$store.dispatch("chronometers/getChronometers");
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
      const chronometer = this.$store.getters["chronometers/getChronometer"](
        id
      );

      this.selectedChronometer = id;
      this.secs = chronometer.time;
      this.inputs.description.value = chronometer.description;
      this.isUpdating = true;
    },
    addChronometer() {
      const chronometerData = {
        time: this.secs,
        description: this.inputs.description.value,
      };

      this.$store.dispatch("chronometers/storeUpdateChronometer", {
        chronometerData,
        isUpdating: this.isUpdating,
        id: this.selectedChronometer,
      });
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
  },
  created() {
    this.fetchChronometers();
  },
};
</script>

<style scoped>
.chronometer {
  padding: 24px 0;
}

.chronometer__container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chronometer__time {
  font-size: 3rem;
  margin-bottom: 16px;
}

.chronometer__actions > *:not(:last-child) {
  margin-right: 16px;
}

.chronometer__menu {
  margin-top: 16px;
}

.chronometer__menu > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
