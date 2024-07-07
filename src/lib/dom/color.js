/* global gsap */

export const color = [
  { background: '#cb9a7f', color: '#9f3c2d' },
  { background: '#394335', color: '#DEC8C7' },
  { background: '#DCD3D3', color: '#852825' },
  { background: '#C7C8D2', color: '#240C7E' },
  { background: '#E5DFDA', color: '#FA5B32' },
  { background: '#94B1D5', color: '#951F1D' },
  { background: '#E69C49', color: '#465342' },
  { background: '#F3D4CE', color: '#131F53' },
  { background: '#D4CAC9', color: '#151817' },
  { background: '#0A0061', color: '#D0CEC7' },
  { background: '#304741', color: '#DC9949' },
  { background: '#DBDCCE', color: '#07014E' },
  { background: '#A6928F', color: '#1B1F76' },
  { background: '#D09696', color: '#444675' },
  { background: '#83190B', color: '#E1926F' },
  { background: '#2C2D2C', color: '#C1B8B7' },
];

export function changeColor(target) {
  gsap.utils.toArray(target).forEach((item, index) => {
    gsap.set(item, {
      backgroundColor: color[index].background,
      color: color[index].color,
    });
    gsap.set(item.querySelectorAll('a'), {
      borderColor: color[index].color,
    });
  });
}
