const state = {
  HEIGHT: 800,
  WIDTH: 400,
  COLOR: 'yellow',
  THICKNESS: 5,
  isEraser: false,
  background: 'navy',
  ref: null, //will hold the ref to interact with the canvas
};

export const setHeight = (newHeight: number): void => {
  state.HEIGHT = newHeight;
};

export const setWidth = (newWidth: number): void => {
  state.WIDTH = newWidth;
};

export const setRef = (ref: any): void => {
  state.ref = ref;
};

export const getHeight = (): number => {
  return state.HEIGHT;
};

export const getWidth = (): number => {
  return state.WIDTH;
};
export const getBackground = (): string => {
  return state.background;
};

export const setColor = (newColor: string): void => {
  state.COLOR = newColor;
};
export const getColor = (): string => {
  return state.COLOR;
};

export const setThickness = (newThickness: number): void => {
  state.THICKNESS = newThickness;
};

export const toggleEraser = (): void => {
  state.isEraser = !state.isEraser;
};

export const getThickness = (): number => {
  return state.THICKNESS;
};

export const isEraser = (): boolean => {
  return state.isEraser;
};

export const setBackground = (newColor: string): void => {
  state.background = newColor;

  //@ts-ignore
  state.ref.c.style.backgroundColor = state.background;
};

export const resetCanvas = (): void => {
  //@ts-ignore
  const canvas = state.ref.c;
  //@ts-ignore
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, state.WIDTH, state.HEIGHT);
};
