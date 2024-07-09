const url = "https://eight-lane-highway.pockethost.io";

function getPbImageURL(item, fileName = "photo") {
  return `${url}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
