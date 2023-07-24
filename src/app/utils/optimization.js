function cutLongString(string) {
  return string.length > 8 ? string.slice(0, 8) + "..." : string;
}

function createRandomImage() {
  return `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
    .toString(36)
    .substring(7)}.svg`;
}

export { cutLongString, createRandomImage };
