<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/iconfont.css";
@import "uview-plus/index.scss";
@import "./styles/tailwind.css";
@import "./styles/animation.scss";
</style>
