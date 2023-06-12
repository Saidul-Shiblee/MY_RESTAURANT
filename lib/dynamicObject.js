export default function dynamicObject(param) {
  const obj = Object.keys(param);
  return obj.reduce((a, v) => ({ ...a, [v]: param[v] }), {});
}
