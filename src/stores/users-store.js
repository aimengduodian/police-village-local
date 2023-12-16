import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    isLogin: false,
    // 用户ID
    userID: null,
    // 用户名称
    userName: null,
    // 用户权限 0:普通用户 1：管理员
    userPower: null,
    // 用户信息数组（临时）
    usersMsgArr: [],
  }),
  getters: {},
  actions: {
    usersLogin(rUserName, rUserPwd) {
      let flag = false;
      this.usersMsgArr.forEach((rItem) => {
        if (rUserName == rItem.userName && rUserPwd == rItem.userPwd) {
          this.userID = rItem.userID;
          this.userName = rItem.userName;
          this.userPower = rItem.userPower;
          this.isLogin = true;
          flag = true;
        }
      });
      return flag;
    },
    // 存储所有用户信息
    saveAllUsersMsg(rUsersMsg) {
      this.usersMsgArr = rUsersMsg;
      console.log(this.usersMsgArr);
    },
  },
});
