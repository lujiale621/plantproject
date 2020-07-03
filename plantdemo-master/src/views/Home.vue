<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          @select="handleSelect"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" :to="{ path: '/boardbash' }">控制台</el-menu-item>
          <el-menu-item index="2" :to="{ path: '/plantdetail' }">植物详情</el-menu-item>
          <el-menu-item index="3" :to="{ path: '/cameraview' }">环境监视</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 4) {
        this.$router.push({
          path: "/logdata"
        });
      } else if (key == 3) {
        this.$router.push({
          path: "/cameraview"
        });
      } else if (key == 2) {
        this.$router.push({
          path: "/plantdetail"
        });
      } else if (key == 1) {
        this.$router.push({
          path: "/boardbash"
        });
      }
    }
  }
};
</script>

<style  scoped>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #545c64;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>