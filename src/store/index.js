import { defineStore } from "pinia";

const userAgentData = navigator["userAgentData"];
const browserName = userAgentData ? navigator["userAgentData"]["brands"][2]["brand"] : "no_data";
const storedDate = localStorage.getItem("date") !== null ? localStorage.getItem("date")?.split(",") : ["2023-01-17 12:00:00", null];

const defaultStartDate = storedDate[0].length > 10 ? new Date(storedDate[0]) : new Date(storedDate[0] + "T12:00:00");
const defaultEndDate = storedDate[1] ? (storedDate[1].length > 10 ? new Date(storedDate[1]) : new Date(storedDate[1] + "T12:00:00")) : null;

const defaultDate = [defaultStartDate, defaultEndDate];
const defaultCurrentPage = "login";

export const Store = defineStore({
  id: "settings",

  state: () => ({
    mainDate: defaultDate,
    currentPage: defaultCurrentPage,
    windowWidth: window.innerWidth,
    browser: browserName,
  }),

  actions: {
    async setMainDate(value) {
      this.mainDate = value;
      console.log(value);
    },

    async setCurrentPage(value) {
      this.currentPage = value;
    },

    async setWindowWidth(value) {
      this.windowWidth = value;
    },
  },
});

// import { defineStore } from "pinia";

// const userAgentData = navigator["userAgentData"];
// const browserName = userAgentData ? navigator["userAgentData"]["brands"][2]["brand"] : "no_data";
// const storedDate = localStorage.getItem("date") !== null ? localStorage.getItem("date")?.split(",") : ["2021-01-01 12:00:00", null];

// const defaultStartDate = storedDate[0].length > 10 ? new Date(storedDate[0]) : new Date(storedDate[0] + "T12:00:00");
// const defaultEndDate = storedDate[1] ? (storedDate[1].length > 10 ? new Date(storedDate[1]) : new Date(storedDate[1] + "T12:00:00")) : null;

// const defaultDate = [defaultStartDate, defaultEndDate];
// const defaultCurrentPage = "login";

// export const Store = defineStore({
//   id: "settings",

//   state: () => ({
//     mainDate: defaultDate,
//     currentPage: defaultCurrentPage,
//     windowWidth: window.innerWidth,
//     browser: browserName,
//   }),

//   actions: {
//     async setMainDate(value) {
//       this.mainDate = value;
//       console.log(value);
//     },

//     async setCurrentPage(value) {
//       this.currentPage = value;
//     },

//     async setWindowWidth(value) {
//       this.windowWidth = value;
//     },
//   },
// });
