import {
  getColor,
  getThickness,
  getHeight,
  getWidth,
  isEraser,
} from './boardSettings';

let canvas;

function inserted(el: any) {
  canvas = el;
  const ctx = canvas.getContext('2d');

  canvas.width = getWidth();
  canvas.height = getHeight();

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  let prevPos = { offsetX: 0, offsetY: 0 };
  let line: any = [];
  let isPainting = false;

  function handleMouseDown(e: any) {
    const { offsetX, offsetY } = e;
    isPainting = true;
    prevPos = { offsetX, offsetY };
  }

  function handleMouseMove(e: any) {
    if (isPainting) {
      const { offsetX, offsetY } = e;
      const offSetData = { offsetX, offsetY };
      const positionInfo = {
        start: { ...prevPos },
        stop: { ...offSetData },
      };
      line = line.concat(positionInfo);
      paint(prevPos, offSetData, getColor());
    }
  }

  function endPaintEvent() {
    if (isPainting) {
      isPainting = false;
    }
  }

  function paint(prevPosition: any, currPosition: any, strokeStyle: any) {
    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPosition;
    if (isEraser()) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(255,255,255,1)';
      ctx.lineWidth = getThickness() * 5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = getThickness();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    prevPos = { offsetX, offsetY };
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', endPaintEvent);
  canvas.addEventListener('mouseleave', endPaintEvent);
}

export default {
  inserted,
};
