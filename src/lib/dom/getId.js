export function getId(idTarget) {
  const url = new URLSearchParams(idTarget.href);
  let id;
  for (const [_, a] of url) id = a;
  return id;
}
