<template>
  <div >
      <Col span="8">
      <div class="card">
        <Card>
          <Row>
            <Col span="10">
              <img class="icon" src="../assets/plant.jpg" />
            </Col>
            <Col span="10">
              <div class="wendu">
                <Progress vertical :percent="hum" status="active" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="14">
              <div class="text">No:{{number}}</div>
            </Col>
            <Col span="10">
              <div class="text">湿度</div>
            </Col>
          </Row>
        </Card>
        </div>
      </Col>
  
  </div>
</template>

<script>
export default {
    props: {
    number: '',
    hum:''
  },
};
</script>

<style scoped>
.icon {
  height: 60px;
  width: 50px;
}
.wendu {
  height: 60px;
  padding-left: 20px;
}
.text {
  padding-top: 10px;
  text-align: center;
}
.card{
    padding: 5px;
}
</style>