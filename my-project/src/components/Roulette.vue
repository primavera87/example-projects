<template>
  <div>
    <router-link class="button-back" to="/">Назад</router-link>
    <div>
      <canvas id='canvas' width='660' height='500'>
        Canvas not supported, use another browser.
      </canvas>
      <button class="button__start-spin" @click="spin">Забрать приз</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Roulette",
  props: {
    options: {
      type: Array,
      default() {
        return ["$100", "$10", "$25", "$250", "$30", "$1000", "$1", "$200", "$45", "$500", "$5", "$20", "Lose", "$1000000", "Lose", "$350", "$5", "$99"]
      }
    }
  },
  data() {
    return {
      startAngle: 0,
      arc: Math.PI / (this.options.length / 2),
      spinTimeout: null,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      ctx: null
    }
  },
  mounted() {
    this.drawRouletteWheel();
  },
  methods: {
    drawRouletteWheel() {
      const canvas = document.getElementById("canvas");

      if (canvas.getContext) {
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 0;

        this.ctx = canvas.getContext("2d");
        this.ctx.clearRect(0, 0, 500, 500);

        this.ctx.strokeStyle = "aquamarine";
        this.ctx.lineWidth = 0;

        this.ctx.font = 'bold 12px Helvetica, Arial';

        for (let i = 0; i < this.options.length; i++) {
          const angle = this.startAngle + i * this.arc;
          //ctx.fillStyle = colors[i];
          // ctx.fillStyle = getColor(i, options.length);
          this.ctx.fillStyle = i % 2 ? '#e3e4e6' : '#100e0e';

          this.ctx.beginPath();
          this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
          this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
          this.ctx.stroke();
          this.ctx.fill();

          this.ctx.save();
          this.ctx.shadowOffsetX = 0;
          this.ctx.shadowOffsetY = 0;
          this.ctx.shadowBlur = 0;
          this.ctx.shadowColor = "rgb(220,220,220)";
          this.ctx.fillStyle = i % 2 ? '#100e0e' : '#e3e4e6';
          const cos = 250 + Math.cos(angle + this.arc / 2) * textRadius;
          const sin = 250 + Math.sin(angle + this.arc / 2) * textRadius;
          this.ctx.translate(cos, sin);
          this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
          const text = this.options[i];
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
          this.ctx.restore();
        }

        this.arrow(outsideRadius);
      }
    },
    arrow(outsideRadius) {
      this.ctx.fillStyle = "#3AD1FF";
      this.ctx.beginPath();
      this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      this.ctx.fill();
    },
    spin() {
      this.spinAngleStart = Math.random() * 10 + 10;
      this.spinTime = 0;
      this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
      this.rotateWheel();
    },
    rotateWheel() {
      this.spinTime += 30;
      if (this.spinTime >= this.spinTimeTotal) {
        this.stopRotateWheel();
        return;
      }
      const spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
      this.startAngle += (spinAngle * Math.PI / 180);
      this.drawRouletteWheel();
      this.spinTimeout = setTimeout(() => {
        this.rotateWheel();
      }, 30);
      console.log(this.spinTimeout)
    },
    stopRotateWheel() {
      clearTimeout(this.spinTimeout);
      const degrees = this.startAngle * 180 / Math.PI + 90;
      const arcd = this.arc * 180 / Math.PI;
      const index = Math.floor((360 - degrees % 360) / arcd);
      this.ctx.save();
      this.ctx.font = 'bold 30px Helvetica, Arial';
      const text = this.options[index]
      this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
      this.ctx.restore();
    },
    easeOut(t, b, c, d) {
      const ts = (t /= d) * t;
      const tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  &__start-spin {
    color: #42D3FF;
    background: #100E0E;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    padding: 6px 16px;
    border: 1px solid #42D3FF;
    filter: drop-shadow(0px 4px 21px #46D4FF);
    border-radius: 3px !important;
    cursor: pointer;
  }
}
</style>
