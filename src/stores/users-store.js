import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    // 用户ID
    userID: null,
    // 用户名称
    userName: null,
    // 用户权限 0:普通用户 1：管理员
    userPower: null,
    // 用户信息数组（临时）
    usersMsgArr: [],
  }),
  getters: {
    // 获取村庄的户主信息列表
    getVillageHouseHolderMsg: (state) => {
      const aVillageCode = state.selectedVillageMsg.value;

      return state.allHouseHolderMsg[aVillageCode];
    },
  },
  actions: {
    // 存储所有用户信息
    saveAllUsersMsg(usersMsg) {
      this.usersMsgArr = usersMsg;
      console.log(this.usersMsgArr);
    },
  },
});
