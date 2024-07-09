export default function getPbImageURL(item, fileName = "photo") {
  const url = "https://eight-lane-highway.pockethost.io";

  return `${url}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
